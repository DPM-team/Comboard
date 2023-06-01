const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const File = require("../models/file");
const User = require("../models/user");
const Data = require("../models/data");
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

const uploadUserProfile = multer({
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

router.put(
  "/api/user/upload/profilephoto",
  authentication,
  uploadUserProfile.single("upload"),
  async (req, res) => {
    const organizationID = req.query.organizationID;
    if (!organizationID) {
      throw new Error("Organization ID is required");
    }
    const userOrgData = await Data.findOne({ userID: req.user._id, organizationID }).select("profilephoto");
    if (!userOrgData) {
      throw new Error();
    }
    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();
    userOrgData.profilePhoto = buffer;
    await userOrgData.save();
    res.set("Content-Type", "image/png");
    res.send(userOrgData.profilePhoto);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/api/user/profilephoto", async (req, res) => {
  try {
    const organizationID = req.query.organizationID;
    const userID = req.query.userID;

    if (!organizationID || !userID) {
      throw new Error();
    }

    const userOrgData = await Data.findOne({ userID, organizationID });

    if (!userOrgData) {
      throw new Error("No user");
    }

    res.set("Content-Type", "image/png");
    res.send(userOrgData.profilePhoto);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.put(
  "/api/user/upload/bannerphoto",
  authentication,
  uploadUserProfile.single("upload"),
  async (req, res) => {
    const organizationID = req.query.organizationID;
    if (!organizationID) {
      throw new Error("Organization ID is required");
    }
    const userOrgData = await Data.findOne({ userID: req.user._id, organizationID }).select("bannerPhoto");
    if (!userOrgData) {
      throw new Error();
    }
    const buffer = await sharp(req.file.buffer).toBuffer();
    userOrgData.bannerPhoto = buffer;
    await userOrgData.save();
    res.set("Content-Type", "image/png");
    res.send(userOrgData.bannerPhoto);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/api/user/bannerphoto", async (req, res) => {
  try {
    const organizationID = req.query.organizationID;
    const userID = req.query.userID;

    if (!organizationID || !userID) {
      throw new Error();
    }

    const userOrgData = await Data.findOne({ userID, organizationID });

    if (!userOrgData) {
      throw new Error("No user");
    }

    res.set("Content-Type", "image/png");
    res.send(userOrgData.profilePhoto);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
