const TaskBoard = require("../models/taskBoard.js");
const Data = require("../models/data.js");

const createTaskBoard = async (req, res) => {
  try {
    const userID = req.body.userID;
    const organizationID = req.body.organizationID;
    const taskBoardName = req.body.taskBoardName;

    if (!userID) {
      return res.status(400).json({ error: "UserID is required!" });
    }

    if (!organizationID) {
      return res.status(400).json({ error: "OrganizationID is required!" });
    }

    if (!taskBoardName) {
      return res.status(400).json({ error: "The name of the task board is required!" });
    }

    // We get the user's data for a specific organization
    const userOrgData = await Data.findOne({ userID, organizationID });

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    const taskBoardObj = new TaskBoard({ name: taskBoardName });

    const savedTaskBoard = await taskBoardObj.save();

    userOrgData.taskBoards.push(savedTaskBoard._id);

    // Save the updated document
    await userOrgData.save();

    res.status(200).json({ successMessage: "Task board has been successfully added to the user!" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  createTaskBoard,
};
