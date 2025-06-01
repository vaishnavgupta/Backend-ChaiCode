import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//Upload On Clodinary

const uploadOnCloudinary = async(localPath) => {
    try {
        if(!localPath) {
            console.error("Could not find File Path")
            return null;
        }
        const resp = await cloudinary.uploader.upload(localPath , {
            resource_type: "auto"
        })
        //Uploaded
        console.log("File Uploaded On Cloudinary",resp.url,resp.public_id);
        return resp;
    } catch (error) {
        fs.unlinkSync(localPath);  //Removes file from local Storage 
        return null;
    }
}

export {uploadOnCloudinary}