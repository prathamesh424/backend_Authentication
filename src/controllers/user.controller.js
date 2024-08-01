import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from "../utils/ApiResponse.js" ;
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500 , "Internal server Token generation failed");
    }

}

const registerUser = asyncHandler(async (req  , res) => {
    const {username , email , password , fullName } = req.body
            //console.log( "REQUEST BODY :- ",req.body)
    // if (fullName === "")  ApiError(400 , "fullName is required")
        //Or
    if ([username, email, password , fullName].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400 , "All fields must require")
    }
    const existingUser = await User.findOne({ $or:[{username} ,{email}]})
    if (existingUser) throw new ApiError(409 , "User is already exist")

    const avatarLocalPath = req.files?.avatar[0]?.path ;
        //const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath ; 
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) { 
        coverImageLocalPath = req.files.coverImage[0]?.path;
    }

                //console.log( " FILES DATA ",req.files)
    if(!avatarLocalPath ) throw new ApiError(400,"No images found")
    
    const avatar = await uploadOnCloudinary(avatarLocalPath) ;
    const coverImage = await uploadOnCloudinary(coverImageLocalPath) ;
    
    
    if (!avatar.url) throw new ApiError(400,"No avatar image found");

    const user = await User.create({
        username : username.toLowerCase(),
        email,
        password,
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })

    const currentUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!currentUser) throw new ApiError(500 , "error while creating user")

    return res.status(201).json(
        new ApiResponse(200 , "User successfully registered")
    )
})

const loginUser = asyncHandler(async (req, res) => {

    const {username , email, password} = req.body
    console.log(username)
    console.log(email)

    if (!(username || email)) {
        throw new ApiError(400, "Username or email are required")
    }
    const user = await User.findOne({ 
            $or : [{username} , {email}]})
    if (!user) {
        throw new ApiError(404 , "User not found")
    }
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials")
    }
    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id);
    
    const loggedInUser = await User.findById(user._id).
        select("-password -refreshToken")
    
    const options = {
        httpOnly : true,
        secure:true
    }

    return res.status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken" , refreshToken , options)
    .json( new ApiResponse( 200 , { 
                    user: loggedInUser , accessToken , refreshToken 
                }, "User logged I  n successfully"))
})


const logoutUser = asyncHandler (async (req , res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
    if (!incomingRefreshToken) {
        throw new ApiError(401 , "unauthorized request")
    }

    try {
            
        const decodedToken = jwt.verify(incomingRefreshToken  , process.env.REFRESH_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken?._id)
        
        if (!user) {
            throw new ApiError(401 , "Invalid refresh token")
        }
    
        if (incomingRefreshToken  !== user?.refreshToken) {
            throw new ApiError(401 , "Refresh token is used ")
        } 
        const options = {
            httpOnly : true,
            secure:true
        }
    
        const {accessToken , newRefreshToken } = await generateAccessAndRefreshToken(user._id)
    
        return res.status(200)
            .clearCookie("accessToken" , accessToken, options)
            .clearCookie("refreshToken" , newRefreshToken , options)
            .json( new ApiResponse(200 , {accessToken , newRefreshToken} , "Access Token refreshed successfully"))
    }
    catch (error) {
        throw new ApiError(401 , error?.message || "invalid refresh token")
    }


})

export {registerUser , loginUser , logoutUser , refreshAccessToken}