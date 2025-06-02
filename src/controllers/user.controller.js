import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // perform validations
    // check if user exist in db by username or email
    // check for images and avatar(*compulsory*)
    // upload images in cloudinary and check if "avatar" succcesfully added
    // create user object - upload in db
    // after that give response back to user(frontend)
    // remove password and refresh token from response
    // check for user response
    // if use then Only return response

    const { fullName, email, username, password } = req.body;
    console.log("email", email);

    if (
        [fullName, email, username, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "Please fill all the fields");
    }

    const existedUser = User.findOne({
        $or: [{ email },{ username }]
    })

    if(existedUser){
        throw new ApiError(409 , "User already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatarRef = await uploadOnCloudinary(avatarLocalPath);
    const coverRef = await uploadOnCloudinary(coverLocalPath);

    if(!avatarRef) {
        throw new ApiError(400 , "Avatar upload failed")
    }

    const userRef = await User.create({
        fullName,
        avatar: avatarRef.url,
        coverImage: coverRef?.url || "",
        email,
        username: username.toLowerCase(),
        password
    })

    const createdUser  = User.findById(userRef._id).select(
        "-password -refreshToken"  // minus(-) measns ki yeh nahi chahiye
    )

    if(!createdUser){
        throw new ApiError(500 , "Unable to create user")
    }

    return res.status(201).json(
        new ApiResponse(
            statusCode = 201,
            data = createdUser,
            message = "User Registed Successfully"
        )
    )

});

export { registerUser };
