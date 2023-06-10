export default {
  async createTeam(context, payload) {
    const teamObj = payload.teamObj;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamObj),
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch("/api/team/create", requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      // Extract the created team data from the response
      const successData = await response.json();

      successData.createdTeam.id = successData?.createdTeam._id;
      successData.createdTeam.supervisorID = successData?.createdTeam.supervisor;
      context.commit("addTeamThatICreate", { newTeamObj: successData?.createdTeam });

      //Add the created team to the organiation's teams
      await context.dispatch("addTeamToOrganization", {
        organizationID: context.rootGetters.selectedOrganizationID,
        teamID: successData.createdTeam._id,
      });

      //Add the created team to the supervisor's teams
      await context.dispatch("addTeamToUser", {
        userID: successData?.createdTeam?.supervisor,
        organizationID: context.rootGetters.selectedOrganizationID,
        teamID: successData.createdTeam._id,
        teamName: successData.createdTeam.name,
      });

      //Add the created team to the user's teams
      for (const userID of successData?.createdTeam?.members) {
        await context.dispatch("addTeamToUser", {
          userID,
          organizationID: context.rootGetters.selectedOrganizationID,
          teamID: successData.createdTeam._id,
          teamName: successData.createdTeam.name,
        });
      }

      // Return the created team data
      return successData;
    } catch (error) {
      throw new Error(error.message || "Failed to create team.");
    }
  },
  async addTeamToOrganization(_, payload) {
    const organizationID = payload.organizationID;
    const teamID = payload.teamID;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organizationID, teamID }),
    };

    try {
      const response = await fetch("/api/organization/team", requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      const successData = await response.json();

      // Return the success data from the api call
      return successData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add team.");
    }
  },
  async addTeamToUser(context, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;
    const teamID = payload.teamID;
    const teamName = payload.teamName;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, organizationID, teamID }),
    };

    try {
      const response = await fetch("/api/user/team", requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      const successData = await response.json();

      try {
        const data = await context.dispatch("createTaskBoard", {
          userID,
          organizationID,
          taskBoardName: `Tasks for '${teamName}' team`,
        });

        console.log(data);
      } catch (error) {
        console.log(error.message);
      }

      // Return the success data from the api call
      return successData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add team.");
    }
  },
  async getTeamMembers(_, payload) {
    const teamID = payload.teamID;

    try {
      const response = await fetch(`/api/team/members?teamID=${teamID}`);

      const data = await response.json();

      if (response.ok) {
        return data?.members;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async getTeamProjects(_, payload) {
    const teamID = payload.teamID;

    try {
      const response = await fetch(`/api/team/projects?teamID=${teamID}`);

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
  async getTeamData(_, payload) {
    const teamID = payload.teamID;

    try {
      const response = await fetch(`/api/team?teamID=${teamID}`);

      const data = await response.json();

      if (response.ok) {
        return data?.teamObj;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async getTeamSupervisor(_, payload) {
    const teamID = payload.teamID;

    try {
      const response = await fetch(`/api/team/supervisor?teamID=${teamID}`);

      const data = await response.json();

      if (response.ok) {
        return data?.teamSupervisor;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async updateTeamPhoto(context, payload) {
    try {
      const file = payload.file;
      const teamID = payload.teamID;
      const formdata = new FormData();
      formdata.append("upload", file, file.name);

      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
        body: formdata,
      };

      const response = await fetch(`/api/team/upload/photo?teamID=${teamID}`, requestOptions);

      return response.blob();
    } catch (e) {
      throw new Error();
    }
  },
};
