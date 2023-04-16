export default {
  async createTeam(_, payload) {
    const teamObj = payload.teamObj;

    try {
      // Make a POST request to the API endpoint
      const response = await fetch("/api/team/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamObj),
      });

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      // Extract the created team data from the response
      const successData = await response.json();

      // Return the created team data
      return successData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create team.");
    }
  },
};
