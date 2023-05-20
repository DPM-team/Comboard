export default {
  selectBoardID(context, payload) {
    context.commit("setSelectedBoardID", { boardID: payload.boardID });
  },
  async createTaskBoard(context, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;
    const taskBoardName = payload.taskBoardName;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: JSON.stringify({ userID, organizationID, taskBoardName }),
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch("/api/taskboard", requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      return responseData;
    } catch (error) {
      throw new Error(error.message || "Failed to create Task Board.");
    }
  },
  async addTaskList(context, payload) {
    const taskBoardID = payload.taskBoardID;
    const taskListName = payload.taskListName;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: JSON.stringify({ taskBoardID, taskListName }),
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch("/api/tasklist", requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      context.commit("setSelectedTaskBoard", { selectedTaskBoard: responseData?.updatedTaskBoard });

      return responseData;
    } catch (error) {
      throw new Error(error.message || "Failed to add Task List.");
    }
  },
  async getTaskBoards(context, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch(`/api/taskboards?userID=${userID}&organizationID=${organizationID}`, requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      return responseData?.taskBoards;
    } catch (error) {
      throw new Error(error.message || "Failed to get Task Boards.");
    }
  },
  async getTaskBoard(context, payload) {
    const taskBoardID = payload.taskBoardID;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch(`/api/taskboard?taskBoardID=${taskBoardID}`, requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      context.commit("setSelectedTaskBoard", { selectedTaskBoard: responseData?.taskBoard });

      return responseData;
    } catch (error) {
      throw new Error(error.message || "Failed to get Task Board's data!");
    }
  },
  async addTask(context, payload) {
    const taskBoardID = payload.taskBoardID;
    const taskListID = payload.taskListID;
    const taskObj = payload.taskObj;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: JSON.stringify({ taskBoardID, taskListID, taskObj }),
    };

    try {
      const response = await fetch("/api/task/add", requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      context.commit("setSelectedTaskBoard", { selectedTaskBoard: responseData?.updatedTaskBoard });

      return responseData;
    } catch (error) {
      throw new Error(error.message || "Failed to add Task.");
    }
  },
  async updateTask(context, payload) {
    const taskBoardID = payload.taskBoardID;
    const taskListID = payload.taskListID;
    const updatedTaskObj = payload.updatedTaskObj;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: JSON.stringify({ taskBoardID, taskListID, updatedTaskObj }),
    };

    try {
      const response = await fetch("/api/task/update", requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      return responseData;
    } catch (error) {
      throw new Error(error.message || "Failed to update Task.");
    }
  },
  async moveTaskList(context, payload) {
    const taskBoardID = payload.taskBoardID;
    const movedListNewIndex = payload.movedListNewIndex;
    const movedListOldIndex = payload.movedListOldIndex;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: JSON.stringify({ taskBoardID, movedListNewIndex, movedListOldIndex }),
    };

    try {
      const response = await fetch("/api/tasklist/move", requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      return responseData;
    } catch (error) {
      throw new Error(error.message || "Failed to move Task list.");
    }
  },
  async moveTaskBetweenCurrList(context, payload) {
    const taskBoardID = payload.taskBoardID;
    const taskListID = payload.taskListID;
    const movedTaskNewIndex = payload.movedTaskNewIndex;
    const movedTaskOldIndex = payload.movedTaskOldIndex;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: JSON.stringify({ taskBoardID, taskListID, movedTaskNewIndex, movedTaskOldIndex }),
    };

    try {
      const response = await fetch("/api/task/move/currlist", requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      return responseData;
    } catch (error) {
      throw new Error(error.message || "Failed to move Task under the current list.");
    }
  },
  async moveTaskToOtherList(context, payload) {
    const taskBoardID = payload.taskBoardID;
    const listIDToMove = payload.listIDToMove;
    const taskObj = payload.taskObj;
    const moveToIndex = payload.moveToIndex;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: JSON.stringify({ taskBoardID, listIDToMove, taskObj, moveToIndex }),
    };

    try {
      const response = await fetch("/api/move/task", requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      return responseData;
    } catch (error) {
      throw new Error(error.message || "Failed to move Task.");
    }
  },
  async renameTaskBoard(context, payload) {
    const taskBoardID = payload.taskBoardID;
    const newTaskBoardName = payload.newTaskBoardName;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: JSON.stringify({ taskBoardID, newTaskBoardName }),
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch(`/api/taskboard/rename`, requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      context.commit("renameTaskBoard", { taskBoardNewName: responseData?.taskBoardNewName });

      return responseData;
    } catch (error) {
      throw new Error(error.message || "Failed to get Task Board's data!");
    }
  },
  async renameTaskList(context, payload) {
    const taskBoardID = payload.taskBoardID;
    const taskListID = payload.taskListID;
    const newTaskListName = payload.updatedTaskListName;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: JSON.stringify({ taskBoardID, taskListID, newTaskListName }),
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch(`/api/tasklist/rename`, requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      return responseData;
    } catch (error) {
      throw new Error(error.message || "Failed to get Task List's data!");
    }
  },
};
