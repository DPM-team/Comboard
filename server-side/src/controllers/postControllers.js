const Post = require("../models/post.js");
const Data = require("../models/data.js");
const User = require("../models/user.js");
const mongoose = require("mongoose");
const moment = require("moment");
const Organization = require("../models/organization.js");
const userUtils = require("../utils/userUtils.js");

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
      contentMedia: req?.file?.buffer || null,
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
const getPostsICreateForAnOrganization = async (req, res) => {
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
    const skip = req.query.skip;

    if (!userID) {
      throw new Error("UserID is required!");
    }

    if (!organizationID) {
      throw new Error("OrganizationID is required!");
    }

    // We get the user's data for a specific organization
    const userOrgData = await Data.findOne({ userID, organizationID })
      .select("organizationID, connections")
      .populate({
        path: "organizationID",
        model: "organization",
        select: "posts",
        populate: {
          path: "posts",
          model: "post",
          match: {
            createdAt: {
              $gte: moment().subtract(7, "days").toDate(),
            },
          },
          options: {
            sort: {
              createdAt: -1,
            },
            limit: 5,
            skip,
          },
        },
      });

    if (!userOrgData) {
      throw new Error();
    }

    const posts = new Array();

    posts.push(...userOrgData.organizationID.posts);

    for (const connection of userOrgData.connections) {
      let connectionOrgaData = await Data.findOne({ userID: connection, orgID: req.query.organizationID })
        .select("posts")
        .populate({
          path: "posts",
          model: "post",
          match: {
            createdAt: {
              $gte: moment().subtract(7, "days").toDate(),
            },
          },
          options: {
            sort: {
              createdAt: -1,
            },
            limit: 5,
            skip,
          },
        });
      posts.push(...connectionOrgaData.posts);
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
      if (post1.postObj.createdAt < post2.postObj.createdAt) {
        return 1;
      } else if (post1.postObj.createdAt > post2.postObj.createdAt) {
        return -1;
      } else {
        return 0;
      }
    });

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

    const comment = {
      userID: userData.userID,
      content: req.body.content,
      commenter: userCreator.name + " " + userCreator.surname,
    };

    post.comments.push(comment);

    await post.save();

    res.status(201).send({ message: "Comment created with success", comment });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const commentsOfPost = async (req, res) => {
  try {
    const organizationID = req.query.orgID;
    const postID = req.params.postID;

    if (!organizationID) {
      throw new Error("Orgaization ID is required");
    }

    if (!postID) {
      throw new Error("Post ID is required");
    }

    const userData = await Data.findOne({
      userID: req.user._id,
      organizationID,
    });

    if (!userData) {
      throw new Error("User data must be existed");
    }

    await userData.populate({ path: "organizationID", model: "organization" });

    const post = await Post.findById(postID);

    const creatorUserData = await Data.findOne({
      userID: post.creatorID,
      organizationID,
    });

    if (
      !userData.posts.includes(mongoose.Types.ObjectId(postID)) &&
      !userData.organizationID.posts.includes(mongoose.Types.ObjectId(postID)) &&
      !creatorUserData.posts.includes(mongoose.Types.ObjectId(postID))
    ) {
      throw new Error("Post id must to be included at least in organization or in connection's list.");
    }

    const comments = post.comments;

    res.status(200).send(comments);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const getPostMedia = async (req, res) => {
  try {
    const organizationID = req.query.organizationID;
    const postID = req.query.postID;

    if (!organizationID) {
      throw new Error("Orgaization ID is required");
    }

    if (!postID) {
      throw new Error("Post ID is required");
    }

    const userData = await Data.findOne({
      userID: req.user._id,
      organizationID,
    }).select("organizationID posts");

    if (!userData) {
      throw new Error("User data must be existed");
    }

    await userData.populate({ path: "organizationID", model: "organization" });

    const post = await Post.findById(postID);

    const creatorUserData = await Data.findOne({
      userID: post.creatorID,
      organizationID,
    });

    if (
      !userData.posts.includes(mongoose.Types.ObjectId(postID)) &&
      !userData.organizationID.posts.includes(mongoose.Types.ObjectId(postID)) &&
      !creatorUserData.posts.includes(mongoose.Types.ObjectId(postID))
    ) {
      throw new Error("Post id must to be included at least in organization or in connection's list.");
    }

    const media = post.contentMedia;

    res.set("Content-Type", "image/png");

    res.status(200).send(media);
  } catch (e) {
    throw new Error(e);
  }
};

const getUsersLikePost = async (req, res) => {
  try {
    const organizationID = req.query.organizationID;
    const postID = req.query.postID;

    if (!organizationID) {
      throw new Error("Orgaization ID is required");
    }

    if (!postID) {
      throw new Error("Post ID is required");
    }

    const userData = await Data.findOne({
      userID: req.user._id,
      organizationID,
    });

    if (!userData) {
      throw new Error("User data must be existed");
    }

    await userData.populate({ path: "organizationID", model: "organization" });

    const post = await Post.findById(postID).select("likes creatorID");

    const creatorUserData = await Data.findOne({
      userID: post.creatorID,
      organizationID,
    });

    if (
      !userData.posts.includes(mongoose.Types.ObjectId(postID)) &&
      !userData.organizationID.posts.includes(mongoose.Types.ObjectId(postID)) &&
      !creatorUserData.posts.includes(mongoose.Types.ObjectId(postID))
    ) {
      throw new Error("Post id must to be included at least in organization or in connection's list.");
    }

    const usersLikePost = await post.populate({
      path: "likes",
      model: "user",
      select: "name surname",
      options: {
        sort: {
          createdAt: 1,
        },
      },
    });

    res.status(200).send({ message: "Users loaded correctly", users: usersLikePost.likes });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const editPost = async (req, res) => {
  try {
    const organizationID = req.query.organizationID;
    const postID = req.query.postID;
    const editContent = req.body.content;

    if (!organizationID || !postID) {
      throw new Error("Fields are required");
    }

    if (!editContent) {
      throw new Error("");
    }

    const userOrgData = await Data.findOne({ userID: req.user._id, organizationID }).populate({ path: "organizationID", model: "organization" }).select("organizationID posts");

    if (!userOrgData) {
      throw new Error();
    }

    if (!userOrgData.posts.includes(new mongoose.Types.ObjectId(postID)) && !userOrgData.organizationID.posts.includes(new mongoose.Types.ObjectId(postID))) {
      throw new Error();
    }

    const post = await Post.findById(postID);

    if (!post) {
      throw new Error();
    }

    post.contentString = editContent;

    await post.save();

    res.status(200).send({ succesMessage: "Edit has completed", content: post.contentString });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const deletePost = async (req, res) => {
  try {
    const organizationID = req.query.organizationID;
    const postID = req.query.postID;

    if (!organizationID || !postID) {
      throw new Error();
    }

    const userOrgData = await Data.findOne({
      userID: req.user._id,
      organizationID,
    })
      .populate({ path: "organizationID", model: "organization" })
      .select("organizationID posts");

    if (!userOrgData) {
      throw new Error("The user data mut be existed.");
    }

    const connectionPost = userOrgData.posts.includes(new mongoose.Types.ObjectId(postID));
    const organizationPost = userOrgData.organizationID.posts.includes(new mongoose.Types.ObjectId(postID));

    if (!connectionPost && !organizationPost) {
      throw new Error();
    }

    const post = await Post.findById(postID);

    await post.delete();

    res.status(201).send({ message: "Post deleted correctly" });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = {
  createPost,
  getPostsICreateForAnOrganization,
  getCurrentPosts,
  toogleUserLike,
  isLiked,
  createComment,
  commentsOfPost,
  getUsersLikePost,
  editPost,
  deletePost,
  getPostMedia,
};
