export default {
  async loadTaskDates(context, payload) {
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
      const response = await fetch(`/api/tasks/dates?userID=${userID}&organizationID=${organizationID}`, requestOptions);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      return responseData;
    } catch (error) {
      throw new Error(error.message || "Failed to get Tasks with dates.");
    }
  },
};
