const Post = require("../models/post.js");
const Data = require("../models/data.js");
const User = require("../models/user.js");
const moment = require("moment");
const Organization = require("../models/organization.js");
const userUtils = require("../utils/userUtils.js");
const { connection } = require("mongoose");

// Create a post for a user
const createPost = async (req, res) => {
  try {
    const organizationID = req.body.organizationID;
    const postObj = JSON.parse(req.body.postObj);

    // Validate required fields
    // if (!postObj?.contentString) {
    //   return res.status(400).json({ error: "Post's content is required field!" });
    // }

    if (!postObj?.creatorID) {
      return res.status(400).json({ error: "Post's creator (userID) is required field!" });
    }

    if (!postObj?.visibilityPost) {
      return res.status(400).json({ error: "Post's visibility is required field!" });
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
      contentMedia: req?.file.buffer,
    });

    // Save the post to the database
    const createdPost = await post.save();

    if (postObj.visibilityPost === "Organization") {
      await userOrgData.populate({ path: "organizationID", model: "" });
      userOrgData.organizationID.posts.push(createdPost._id); // Save the new added post to user's organization posts all the members can see this
      await userOrgData.organizationID.save();
    } else {
      userOrgData.posts.push(createdPost._id); // Save the new assed post to user's post connections can see this
      await userOrgData.save();
    }

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

const getCurrentPosts = async (req, res) => {
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
    const userOrgData = await Data.findOne({ userID, organizationID }).populate({ path: "organizationID", model: "organization", populate: { path: "posts", model: "post" } });

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    let posts = new Array();

    for (const post of userOrgData.organizationID.posts) {
      let date = moment(post.createdAt).isoWeek();

      if (date === moment().isoWeek()) {
        posts.push(post);
      }
    }

    const conectionData = [];
    for (const connection of userOrgData.connections) {
      let data = await Data.findOne({ userID: connection, orgID: req.query.organizationID });
      conectionData.push(data);
    }

    for (const data of conectionData) {
      await data.populate({ path: "posts", model: "post" });
      for (const post of data.posts) {
        let date = moment(post.createdAt).isoWeek();

        if (date === moment().isoWeek()) {
          posts.push(post);
        }
      }
    }

    const allPosts = [];

    for (const postObj of posts) {
      const creatorObj = await User.findById(postObj.creatorID);
      allPosts.push({
        postObj,
        creatorObj: {
          name: creatorObj.name,
          surname: creatorObj.surname,
        },
      });
    }

    allPosts.sort((post1, post2) => {
      return "";
    });

    console.log("");

    res.status(200).json({ succesMessage: "Posts loaded with success!", allPosts });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
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

const createComment = async (req, res) => {
  try {
    const userCreator = req.user;

    const userData = await Data.findOne({
      userID: userCreator._id,
      organizationID: req.orgId,
    });

    if (!userData) {
      throw new Error("The user data mut be existed.");
    }

    await userData.populate({ path: "organizationID", model: "organization" });

    const post = await Post.findOne({ _id: req.params.postId });

    post.comments.push({
      userID: userData.userID,
      content: req.body.content,
      commenter: userCreator.name + " " + userCreator.surname,
    });

    await post.save();

    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const commentsOfPost = async (req, res) => {
  try {
    const userData = await Data.findOne({
      userID: req.user._id,
      organizationID: req.query.orgID,
    });

    if (!userData) {
      throw new Error();
    }

    await userData.populate({ path: "organizationID", model: "organization", populate: { path: "posts", model: "post" } });

    if (!userData.posts.includes(req.params.postID) && !userData.organizationID.posts.includes(req.params.postID)) {
      throw new Error("Post id must to be included at least in organization or on connection's list. ");
    }

    const post = await Post.findOne({ _id: req.params.postID });

    const comments = post.comments;

    res.status(200).send(comments);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = {
  createPost,
  getPosts,
  getCurrentPosts,
  toogleUserLike,
  isLiked,
  createComment,
  commentsOfPost,
};
