import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from "../utils/ApiResponse.js" ;


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
    

export {registerUser}