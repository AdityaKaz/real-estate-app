import express from "express";
import { upload } from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
import { errorHandler } from "../utils/error.js";

const router = express.Router();

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "user_profiles" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

router.post("/upload-image", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, "No file uploaded"));
    }

    const result = await uploadToCloudinary(req.file.buffer);

    return res.json({
      secure_url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return next(errorHandler(500, error.message || "Upload failed"));
  }
});

export default router;
