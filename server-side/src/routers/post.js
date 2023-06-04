const express = require("express");
const postControllers = require("../controllers/postControllers.js");
const authentication = require("../middleware/authentication.js");
const authenticationOrg = require("../middleware/authenticationOrg.js");
const multer = require("multer");

const router = new express.Router();

const uploadMedia = multer({
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error());
    }

    callback(undefined, true);
  },
});
// Router to add a post to user's post for a specific organization
router.post("/api/post", authentication, uploadMedia.single("upload"), postControllers.createPost, (error, req, res, next) => {
  res.status(400).send();
});

// Router to get user's post for a specific organization
router.get("/api/network/posts", authentication, postControllers.getCurrentPosts);

router.get("/api/network/myposts", authentication, postControllers.getPostsICreateForAnOrganization);

// Router to add or remove a like
router.put("/api/post/like", authentication, postControllers.toogleUserLike);

// Router to check if a user likes a post or not
router.get("/api/post/isliked", authentication, postControllers.isLiked);

router.get("/api/post/media", authentication, postControllers.getPostMedia);

router.put("/api/post/edit", authentication, postControllers.editPost);

router.delete("/api/post/delete", authentication, postControllers.deletePost);

router.get("/api/post/like/users", authentication, postControllers.getUsersLikePost);

router.put("/api/post/:postId/createComment", authentication, authenticationOrg, postControllers.createComment);

router.get("/api/post/:postID/comments", authentication, postControllers.commentsOfPost);

module.exports = router;
