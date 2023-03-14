const multer = require("multer");
const express = require("express");
const File = require("../models/file");
const sharp = require("sharp");
const authentication = require("../middleware/authentication");
const User = require("../models/user");

const router = new express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx|png|pdf|jpeg|xls)$/)) {
      return cb(new Error("The type of file is not correct."));
    }

    cb(undefined, true);
  },
});

router.post(
  "/api/user/upload",
  authentication,
  upload.single("upload"),
  async (req, res) => {
    const user = req.user;
    const file = new File({ userId: user._id, name: req.file.originalname, binary: req.file.buffer });

    await file.save();

    user.files.push(file._id);

    await user.save();

    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get(
  "/api/user/files",
  authentication,
  async (req, res) => {
    const user = req.user;

    //send user files

    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

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

    if (!user || !user.profilePhoto) {
      throw new Error("No user");
    }
    res.set("Content-Type", "image/png");
    res.send(user.profilePhoto);
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/api/users/:id/file/:fileId", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.profilePhoto) {
      throw new Error("No user");
    }

    const file = await File.findById(req.params.fileId);

    if (!file) {
      throw new Error("No file");
    }

    res.set("Content-Type", "application/pdf");

    res.send(file.binary);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
