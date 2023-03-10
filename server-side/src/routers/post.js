const express = require("express");
const Post = require("../models/post");

const router = new express.Router();

router.post("/api/post", async function (req, res) {
  const postObj = new Post({
    ...req.body,
  });

  try {
    await postObj.save();
    res.status(201).send(postObj);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
