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

  async requestConnection(context, payload) {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${context.getters.loggedUserToken}`);
      myHeaders.append("AuthorizationOrg", `${context.getters.selectedOrganizationID}`);

      let requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };

      const request = await fetch(`/api/user/requestConnection?userId=${payload.userId}`, requestOptions);

      if (!request.ok) {
        throw new Error();
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  async recommentedConnections(context) {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${context.getters.loggedUserToken}`);
      myHeaders.append("AuthorizationOrg", `${context.getters.selectedOrganizationID}`);

      let requestOptions = {
        method: "GET",
        headers: myHeaders,

        redirect: "follow",
      };

      let response = await fetch("/api/organization/recommentedConnections", requestOptions);

      let reccomentedConnections = await response.json();

      return reccomentedConnections;
    } catch (e) {
      console.log(e);
      throw new Error();
    }
  },
};
