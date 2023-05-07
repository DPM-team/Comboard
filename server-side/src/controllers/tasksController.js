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

    res.status(200).json({ successMessage: "Task board has been successfully added to the user!", savedTaskBoard });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const addTaskList = async (req, res) => {
  try {
    const taskBoardID = req.body.taskBoardID;
    const taskListName = req.body.taskListName;

    if (!taskBoardID) {
      return res.status(400).json({ error: "taskBoardID is required!" });
    }

    if (!taskListName) {
      return res.status(400).json({ error: "The name of the task list is required!" });
    }

    const taskBoard = await TaskBoard.findById(taskBoardID);

    if (!taskBoard) {
      return res.status(404).json({ error: "Task board doesn't found!" });
    }

    taskBoard.taskLists.push({ name: taskListName });

    const updatedTaskBoard = await taskBoard.save();

    res.status(200).json({ successMessage: "Task list has been successfully added to the board!", updatedTaskBoard });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const getTasksWithDate = async (req, res) => {
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

    const taskDates = new Array();

    for (const taskBoard of userOrgData.taskBoards) {
      for (const taskListObj of taskBoard.taskLists) {
        for (const taskObj of taskListObj.taskItems) {
          if (taskObj.fromDate && taskObj.toDate) {
            taskDates.push({
              _id: taskObj._id,
              title: taskObj.title,
              dates: {
                start: new Date(taskObj.fromDate),
                end: new Date(taskObj.toDate),
              },
            });
          } else if (taskObj.fromDate) {
            taskDates.push({
              _id: taskObj._id,
              title: taskObj.title,
              dates: new Date(taskObj.fromDate),
            });
          } else if (taskObj.toDate) {
            taskDates.push({
              _id: taskObj._id,
              title: taskObj.title,
              dates: new Date(taskObj.toDate),
            });
          }
        }
      }
    }

    res.status(200).json({ taskDates });
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
      const updatedTaskBoard = await TaskBoard.findByIdAndUpdate(taskBoardID, taskBoard, { new: true });
      res.status(200).json({ updatedTaskBoard });
    } else {
      res.status(400).json({ error: "Task doesn't added!" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskBoardID = req.body.taskBoardID;
    const taskListID = req.body.taskListID;
    const updatedTaskObj = req.body.updatedTaskObj;

    if (!taskBoardID) {
      return res.status(400).json({ error: "taskBoardID is required!" });
    }

    if (!taskListID) {
      return res.status(400).json({ error: "taskListID is required!" });
    }

    if (!updatedTaskObj) {
      return res.status(400).json({ error: "updatedTaskObj is required!" });
    }

    if (!updatedTaskObj?.title.trim()) {
      return res.status(400).json({ error: "Task title is required!" });
    }

    const taskBoard = await TaskBoard.findById(taskBoardID);

    if (!taskBoard) {
      return res.status(404).json({ error: "Task board doesn't found!" });
    }

    let updated = false;

    for (const taskListObj of taskBoard.taskLists) {
      if (taskListObj._id.toString() === taskListID) {
        for (let [index, taskObj] of taskListObj.taskItems.entries()) {
          if (taskObj._id.toString() === updatedTaskObj._id) {
            taskListObj.taskItems[index] = updatedTaskObj;
            updated = true;
            break;
          }
        }
      }
    }

    if (updated) {
      const updatedTaskBoard = await TaskBoard.findByIdAndUpdate(taskBoardID, taskBoard, { new: true });
      res.status(200).json({ updatedTaskBoard, updatedTaskObj, successMessage: "Task updated with Success!" });
    } else {
      res.status(400).json({ error: "Task doesn't updated!" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const moveTaskList = async (req, res) => {
  try {
    const taskBoardID = req.body.taskBoardID;
    const movedListNewIndex = req.body.movedListNewIndex;
    const movedListOldIndex = req.body.movedListOldIndex;

    if (!taskBoardID) {
      return res.status(400).json({ error: "taskBoardID is required!" });
    }

    if (!movedListNewIndex && movedListNewIndex !== 0) {
      return res.status(400).json({ error: "movedListNewIndex is required!" });
    }

    if (!movedListOldIndex && movedListOldIndex !== 0) {
      return res.status(400).json({ error: "movedListOldIndex is required!" });
    }

    const taskBoard = await TaskBoard.findById(taskBoardID);

    if (!taskBoard) {
      return res.status(404).json({ error: "Task board doesn't found!" });
    }

    if (movedListNewIndex >= 0 && movedListOldIndex >= 0 && movedListNewIndex < taskBoard.taskLists.length && movedListOldIndex < taskBoard.taskLists.length) {
      const [listToMove] = taskBoard.taskLists.splice(movedListOldIndex, 1);
      taskBoard.taskLists.splice(movedListNewIndex, 0, listToMove);

      const updatedTaskBoard = await taskBoard.save();

      res.status(200).json({ updatedTaskBoard });
    } else {
      res.status(400).json({ error: "Task list doesn't moved!" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const moveTaskBetweenCurrList = async (req, res) => {
  try {
    const taskBoardID = req.body.taskBoardID;
    const taskListID = req.body.taskListID;
    const movedTaskNewIndex = req.body.movedTaskNewIndex;
    const movedTaskOldIndex = req.body.movedTaskOldIndex;

    if (!taskBoardID) {
      return res.status(400).json({ error: "taskBoardID is required!" });
    }

    if (!taskListID) {
      return res.status(400).json({ error: "taskListID is required!" });
    }

    if (!movedTaskNewIndex && movedTaskNewIndex !== 0) {
      return res.status(400).json({ error: "movedTaskNewIndex is required!" });
    }

    if (!movedTaskOldIndex && movedTaskOldIndex !== 0) {
      return res.status(400).json({ error: "movedTaskOldIndex is required!" });
    }

    const taskBoard = await TaskBoard.findById(taskBoardID);

    if (!taskBoard) {
      return res.status(404).json({ error: "Task board doesn't found!" });
    }

    let moved = false;

    for (const taskListObj of taskBoard.taskLists) {
      if (taskListObj._id.toString() === taskListID) {
        const [itemToMove] = taskListObj.taskItems.splice(movedTaskOldIndex, 1);
        taskListObj.taskItems.splice(movedTaskNewIndex, 0, itemToMove);
        moved = true;
        break;
      }
    }

    if (moved) {
      const updatedTaskBoard = await TaskBoard.findByIdAndUpdate(taskBoardID, taskBoard, { new: true });
      res.status(200).json({ updatedTaskBoard });
    } else {
      res.status(400).json({ error: "Task doesn't moved!" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const moveTaskToOtherList = async (req, res) => {
  try {
    const taskBoardID = req.body.taskBoardID;
    const listIDToMove = req.body.listIDToMove;
    const taskObj = req.body.taskObj;
    const moveToIndex = req.body.moveToIndex;

    if (!taskBoardID) {
      return res.status(400).json({ error: "taskBoardID is required!" });
    }

    if (!listIDToMove) {
      return res.status(400).json({ error: "listIDToMove is required!" });
    }

    if (!taskObj) {
      return res.status(400).json({ error: "taskObj is required!" });
    }

    if (!moveToIndex && moveToIndex !== 0) {
      return res.status(400).json({ error: "moveToIndex is required!" });
    }

    const taskBoard = await TaskBoard.findById(taskBoardID);

    if (!taskBoard) {
      return res.status(404).json({ error: "Task board doesn't found!" });
    }

    let moved = false;

    for (const taskListObj of taskBoard.taskLists) {
      if (taskListObj._id.toString() === listIDToMove) {
        if (moveToIndex >= 0 && moveToIndex <= taskListObj.taskItems.length) {
          taskListObj.taskItems.splice(moveToIndex, 0, taskObj);
          moved = true;
          break;
        }
      }
    }

    if (moved) {
      for (const taskListObj of taskBoard.taskLists) {
        if (taskListObj._id.toString() !== listIDToMove) {
          for (const [index, task] of taskListObj.taskItems.entries()) {
            if (task._id.toString() === taskObj._id) {
              if (index !== -1) {
                taskListObj.taskItems.splice(index, 1);
                break;
              }
            }
          }
        }
      }
    }

    if (moved) {
      const updatedTaskBoard = await TaskBoard.findByIdAndUpdate(taskBoardID, taskBoard, { new: true });
      res.status(200).json({ updatedTaskBoard });
    } else {
      res.status(400).json({ error: "Task doesn't moved!" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  createTaskBoard,
  getTasksWithDate,
  addTaskList,
  getTaskBoards,
  getTaskBoard,
  addTask,
  updateTask,
  moveTaskList,
  moveTaskBetweenCurrList,
  moveTaskToOtherList,
};
