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

    const taskBoardObj = new TaskBoard({ name: taskBoardName, taskLists: [{ name: "Doing" }, { name: "To Do" }, { name: "Done" }] });

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

const getTaskBoards = async (req, res) => {
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
    const userOrgData = await Data.findOne({ userID, organizationID }).populate("taskBoards");

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    res.status(200).json({ taskBoards: userOrgData.taskBoards });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const getTaskBoard = async (req, res) => {
  try {
    const taskBoardID = req.query.taskBoardID;

    if (!taskBoardID) {
      return res.status(400).json({ error: "taskBoardID is required!" });
    }

    const taskBoard = await TaskBoard.findById(taskBoardID);

    if (!taskBoard) {
      return res.status(404).json({ error: "Task board doesn't found!" });
    }

    res.status(200).json({ taskBoard });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const addTask = async (req, res) => {
  try {
    const taskBoardID = req.body.taskBoardID;
    const taskListID = req.body.taskListID;
    const taskObj = req.body.taskObj;

    if (!taskBoardID) {
      return res.status(400).json({ error: "taskBoardID is required!" });
    }

    if (!taskListID) {
      return res.status(400).json({ error: "taskListID is required!" });
    }

    if (!taskObj) {
      return res.status(400).json({ error: "taskObj is required!" });
    }

    const taskBoard = await TaskBoard.findById(taskBoardID);

    if (!taskBoard) {
      return res.status(404).json({ error: "Task board doesn't found!" });
    }

    let added = false;

    for (const taskListObj of taskBoard.taskLists) {
      if (taskListObj._id.toString() === taskListID) {
        taskListObj.taskItems.push(taskObj);
        added = true;
        break;
      }
    }

    if (added) {
      const updatedTaskBoard = await taskBoard.save();
      res.status(200).json({ updatedTaskBoard });
    } else {
      res.status(400).json({ error: "Task doesn't added!" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  createTaskBoard,
  getTaskBoards,
  getTaskBoard,
  addTask,
};
