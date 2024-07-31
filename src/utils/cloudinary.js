import fs from 'fs';
import {v2 as cloudinary} from 'cloudinary';



// sign-in details to cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});




const uploadOnCloudinary = async (localFile) => {
    try {
        if (!localFile) return null ;

        const response = await cloudinary.uploader.upload(localFile , {
            resource_type:'auto'
        });
            //console.log(response);
        // console.log("File uploaded successfully" , response.url);
        fs.unlinkSync(localFile);
        return response
    } catch (error) {
        fs.unlinkSync(localFile);
        console.log("File Upload Failed" , error );
    }
}



export {uploadOnCloudinary};