import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const UserSchema = Schema({
    email :{
        type: String ,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true,
     },
    username :{
        type: String ,
        required: true,
        unique: true,  
        trim: true,
        lowercase: true,
        index: true,
    },
    avatar:{
        type: String ,
        required: true,
    },
    coverImage :{
        type: String ,
    }, 
    watchHistory: [
        {
           type : Schema.Types.ObjectId,
           ref:"Video"
        }
    ] ,    
      refreshToken: {
        type:String
    } ,
    password :{
        type : String ,
        required: [true , 'Password is required'], 
    }, 
} , {
    timestamps: true
})



UserSchema.pre("save" , async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10);
        next();
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

UserSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password , this.password)
}

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            username: this.username,
            email : this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id,   
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
} 

export const User = mongoose.model("User", UserSchema);