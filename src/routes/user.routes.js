import { Router } from "express";
import { registerUser ,loginUser, logoutUser, refreshAccessToken , changeCurrentPassword ,
    getCurrentUser , updateAvatar , updateAccountDetails , getUserChannelProfile , getWatchHistory,
    updateCoverImage} from "../controllers/user.controller.js";
import  upload  from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = new Router();


router.route("/register").post(upload,registerUser);

router.route("/login").post(loginUser)



router.route("/logout").post( verifyJWT ,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(  verifyJWT ,changeCurrentPassword)
router.route("/current-user").get(verifyJWT , getCurrentUser) 
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
//router.route("/change-avatar").patch(verifyJWT , upload.single("avatar") , updateAvatar)
//router.route("/change-cover-image").patch(verifyJWT , upload.single("coverImage") , updateCoverImage)
router.route("/c/:username").get(verifyJWT , getUserChannelProfile)
router.route("/watch-history").get(verifyJWT , getWatchHistory )


export default router;