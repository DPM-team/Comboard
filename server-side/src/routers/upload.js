const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const File = require("../models/file");
const User = require("../models/user");
const authentication = require("../middleware/authentication");
const uploadController = require("../controllers/uploadController.js");

const router = new express.Router();

const storageUpload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit,
  },
  fileFilter(req, file, callback) {
    if (
      !file.originalname.match(
        /\.(doc|docx|xls|xlsx|ppt|pptx|pdf|txt|csv|rtf|html|htm|xml|json|js|css|java|py|vue|c|zip|rar|7z|tar|gz|gzip|bmp|jpg|jpeg|png|gif|tiff|tif|svg|mp3|wav|aac|ogg|mp4|mov|avi|wmv|flv)$/
      )
    ) {
      return callback(new Error("The type of file is not correct."));
    }

    callback(undefined, true);
  },
});

router.post("/api/storage/upload", authentication, storageUpload.single("upload"), uploadController.storageFileUpload, function (error, req, res, next) {
  res.status(400).json({ error: error.message });
});

router.get("/api/storage/files", authentication, uploadController.getStorageFiles);

router.get("/api/storage/file/:fileID", uploadController.getStorageUploadedFile);

const uploadProfile = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpeg|svg)$/)) {
      return cb(new Error("The type of file is not correct."));
    }

    cb(undefined, true);
  },
});

router.post(
  "/api/user/upload/profilephoto",
  authentication,
  uploadProfile.single("upload"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();
    req.user.profilePhoto = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/api/users/:id/profilephoto", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error("No user");
    }

    let message = "User has a photo";
    if (user.profilePhoto === undefined) {
      message = "User has no upload a photo";
    }

    res.set("Content-Type", "image/png");
    res.send({ profilePhoto: user.profilePhoto, message });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
