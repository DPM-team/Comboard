export default {
  async getUserTeams(_, payload) {
    const userID = payload.userID;

    try {
      const response = await fetch(`/api/user/teams?userID=${userID}`);

      const data = await response.json();

      if (response.ok) {
        return data?.teams;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
};
