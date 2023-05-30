const Data = require("../models/data.js");
const File = require("../models/file.js");

const storageFileUpload = async (req, res) => {
  try {
    const userID = req.body.userID;
    const organizationID = req.body.organizationID;

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

    const fileObj = new File({ name: Buffer.from(req.file.originalname, "latin1").toString("utf8"), type: req.file.mimetype, binary: req.file.buffer });

    await fileObj.save();

    userOrgData.files.push(fileObj._id);

    await userOrgData.save();

    return res.status(200).json({ successMessage: "File stored with success!" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const getStorageFiles = async (req, res) => {
  try {
    const userID = req.query.userID;
    const organizationID = req.query.organizationID;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10; // Number of files to return per page

    if (!userID) {
      return res.status(400).json({ error: "UserID is required!" });
    }

    if (!organizationID) {
      return res.status(400).json({ error: "OrganizationID is required!" });
    }

    // We get the user's data for a specific organization
    const userOrgData = await Data.findOne({ userID, organizationID }).populate({
      path: "files",
      options: {
        skip: (page - 1) * limit,
        limit: limit,
      },
    });

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    // Fetch the count of all files for the given userID and organizationID
    const data = await Data.findOne({ userID, organizationID });
    const totalFiles = data.files.length;

    return res.status(200).json({ files: userOrgData.files, totalFiles });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const getStorageUploadedFile = async (req, res) => {
  try {
    const fileObj = await File.findById(req.params.fileID);

    if (!fileObj) {
      throw new Error("No file found!");
    }

    res.set("Content-Type", fileObj.type);

    res.status(200).send(fileObj.binary);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send("Server error.");
  }
};

module.exports = {
  storageFileUpload,
  getStorageFiles,
  getStorageUploadedFile,
};
