export default {
  async getUserTeams(_, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;

    try {
      const response = await fetch(`/api/user/teams?userID=${userID}&organizationID=${organizationID}`);

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
  async getUserProjects(_, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;

    try {
      const response = await fetch(`/api/user/projects?userID=${userID}&organizationID=${organizationID}`);

      const data = await response.json();

      if (response.ok) {
        return data?.projects;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
};
