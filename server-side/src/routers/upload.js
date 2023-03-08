const multer = require("multer");
const express = require("express");
const User = require("../models/user");

const router = new express.Router();

const upload = multer({
  dest: "files",
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
  "/user/upload",
  upload.single("upload"),
  (req, res) => {
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
  "/user/upload/profilephoto",
  uploadProfile.single("upload"),
  async (req, res) => {
    req.user.profilephoto = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
