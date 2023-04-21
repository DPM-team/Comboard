const Post = require("../models/post.js");
const Data = require("../models/data.js");
const User = require("../models/user.js");
const userUtils = require("../utils/userUtils.js");

// Create a post for a user
const createPost = async (req, res) => {
  try {
    const { postObj, organizationID } = req.body;

    // Validate required fields
    if (!postObj?.contentString) {
      return res.status(400).json({ error: "Post's content is required field!" });
    }

    if (!postObj?.creatorID) {
      return res.status(400).json({ error: "Post's creator (userID) is required field!" });
    }

    if (!organizationID) {
      return res.status(400).json({ error: "The organization that the post belongs to (organizationID), is required field!" });
    }

    //Chech if the user who added as creator exists in the db
    const creatorExists = await userUtils.userExists(postObj?.creatorID);

    if (creatorExists?.error) {
      return res.status(400).json({ error: creatorExists.error });
    }

    // We get the user's data for a specific organization
    const userOrgData = await Data.findOne({ userID: postObj.creatorID, organizationID });

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    // Create a new post object
    const post = new Post({
      creatorID: postObj.creatorID,
      contentString: postObj.contentString,
    });

    // Save the post to the database
    const createdPost = await post.save();

    // Save the new added post to he user's organization posts
    userOrgData.posts.push(createdPost._id);

    await userOrgData.save();

    res.status(201).json({ successMessage: "Post is created with success!", createdPost });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

// Get all user post for a specific organization
const getPosts = async (req, res) => {
  try {
    const userID = req.query.userID;
    const organizationID = req.query.organizationID;

    if (!userID) {
      return res.status(400).json({ error: "UserID is required!" });
    }

    if (!organizationID) {
      return res.status(400).json({ error: "OrganizationID is required!" });
    }

    // We get the user's data for a specific organization
    const userOrgData = await Data.findOne({ userID, organizationID }).populate("posts");

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    const posts = new Array();

    for (const postObj of userOrgData.posts) {
      const creatorObj = await User.findById(postObj.creatorID);
      posts.push({
        postObj,
        creatorObj: {
          name: creatorObj.name,
          surname: creatorObj.surname,
        },
      });
    }

    res.status(200).json({ succesMessage: "Posts loaded with success!", posts });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const toogleUserLike = async (req, res) => {
  try {
    const userID = req.query.userID;
    const postID = req.query.postID;

    if (!userID) {
      return res.status(400).json({ error: "UserID is required!" });
    }

    if (!postID) {
      return res.status(400).json({ error: "PostID is required!" });
    }

    //Chech if users with the given IDs exists in the db
    const userExists = await userUtils.userExists(userID);

    if (userExists?.error) {
      return res.status(400).json({ error: userExists.error });
    }

    const postObj = await Post.findById({ _id: postID });

    if (!postObj) {
      return res.status(400).json({ error: "PostID dont't found!" });
    }

    let message = "";

    if (postObj.likes.includes(userID)) {
      const index = postObj.likes.indexOf(userID);
      // only splice array when item is found
      if (index > -1) {
        postObj.likes.splice(index, 1); // 2nd parameter means remove one item only
      }
      message = "Like removed!";
    } else {
      postObj.likes.push(userID);
      message = "Like added!";
    }

    await postObj.save();

    res.status(200).json({ succesMessage: message });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(400).json({ error: "Server error." });
  }
};

// Checks if a user likes a post
const isLiked = async (req, res) => {
  try {
    const userID = req.query.userID;
    const postID = req.query.postID;

    if (!userID) {
      return res.status(400).json({ error: "UserID is required!" });
    }

    if (!postID) {
      return res.status(400).json({ error: "PostID is required!" });
    }

    const postObj = await Post.findById(postID);

    if (!postObj) {
      return res.status(400).json({ error: "Post don't found!" });
    }

    if (postObj.likes.includes(userID)) {
      return res.status(200).json({ isLiked: true });
    } else {
      return res.status(200).json({ isLiked: false });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(400).json({ error: "Server error." });
  }
};

module.exports = {
  createPost,
  getPosts,
  toogleUserLike,
  isLiked,
};
