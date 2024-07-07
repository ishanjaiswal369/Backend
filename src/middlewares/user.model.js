import mongoose, {Schema} from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        uername:{
            type: String,
            required: true,
            unique: true,
            lowercase: true, 
            trim: true,
            minlength: 4,
            maxlength: 30,
            index: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true, 
            trim: true,
        },
        fullName:{
            type: String,
            required: true,
            unique: true,
            lowercase: true, 
            trim: true,
        },
        avatar:{
            type: String, //cloudinary URL
            required: true,
        },
        coverImage:{
            type: String,
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
        password:{
            type:String,
            required: [true, "Password is required"]
        },
        refreshToken:{
            type: String
        }
    },
 {timestamps: true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})  

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}   

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshTojen = function(){
    return jwt.sign({
        _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRTY
        }
    )
}


export const user = mongoose.model("User", userSchema)