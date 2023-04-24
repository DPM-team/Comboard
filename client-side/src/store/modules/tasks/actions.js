export default {
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
};
