const express = require("express");
const postControllers = require("../controllers/postControllers.js");
const authentication = require("../middleware/authentication.js");

const router = new express.Router();

// Router to add a post to user's post for a specific organization
router.post("/api/post", authentication, postControllers.createPost);

// Router to get user's post for a specific organization
router.get("/api/network/posts", authentication, postControllers.getPosts);

// Router to add or remove a like
router.put("/api/post/like", authentication, postControllers.toogleUserLike);

// Router to check if a user likes a post or not
router.get("/api/post/isliked", authentication, postControllers.isLiked);

module.exports = router;
