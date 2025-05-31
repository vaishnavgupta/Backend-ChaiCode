import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videoFile: {    //from cloudinary
        type: String,
        required: true
    },
    thumbnail: {
        type: String, //from cloudinary
        required: true
    },
    title: {
        type: String, 
        default: "Unavailable Title",
    },
    description: {
        type: String, 
        default: "No desciption added for this video",
    },
    duration: {
        type: Number, 
        default: 0,
        required: true
    },
    views: {
        type: Number, 
        default: 0,
    },
    isPublished: {
        type: Boolean, 
        default: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},{timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema);