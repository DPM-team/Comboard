const express = require("express");
const Post = require("../models/post");
const authentication = require("../middleware/authentication");
const authenticationOrg = require("../middleware/authenticationOrg");

const router = new express.Router();

router.post("/api/user/post", authentication, authenticationOrg, async function (req, res) {
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

router.put("/api/user/like/post/:postId", authentication, authenticationOrg, async function (req, res) {
  try {
    const post = await Post.findOne({ _id: req.params.postId });
    let liked;

    if (!post) {
      throw new Error();
    }

    if (post.likes.includes(req.user._id)) {
      liked = true;
      post.likes.pop(req.user._id);
    } else {
      liked = false;
      post.likes.push(req.user._id);
    }

    await post.save();

    res.status(201).send(liked);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/api/user/like/post/:postId", authentication, authenticationOrg, async function (req, res) {
  try {
    const post = await Post.findOne({ _id: req.params.postId });
    let liked;

    if (!post) {
      throw new Error();
    }

    if (post.likes.includes(req.user._id)) {
      liked = true;
    } else {
      liked = false;
    }

    res.status(201).send(liked);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/api/user/posts", authentication, authenticationOrg, async function (req, res) {
  const posts = await Post.find({ userId: req.user });

  try {
    res.status(201).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/api/org/:id/posts", authentication, authenticationOrg, async function (req, res) {
  const posts = await Post.find({ orgId: req.params.id });
  let postPopulate = [];

  for (let i in posts) {
    await posts[i].populate({
      path: "userId",
      model: "user",
    });
    postPopulate.push({
      _id: posts[i]._id,
      firstname: posts[i].userId.name,
      lastname: posts[i].userId.surname,
      likes: posts[i]?.likes?.length || 0,
      contentString: posts[i].contentString,
      createdAt: posts[i].createdAt,
    });
  }

  try {
    res.status(201).send(postPopulate);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
