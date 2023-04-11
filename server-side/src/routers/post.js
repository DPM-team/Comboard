const express = require("express");
const Post = require("../models/post");
const authentication = require("../middleware/authentication");

const router = new express.Router();

router.post("/api/user/post", async function (req, res) {
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

router.get("/api/user/posts", authentication, async function (req, res) {
  const posts = await Post.find({ userId: req.user });

  try {
    res.status(201).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
