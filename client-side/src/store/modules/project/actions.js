export default {
  async createProject(context, payload) {
    const projectObj = payload.projectObj;
    // The id of the team that the project belongs to
    const teamID = payload.teamID;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectObj),
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch("/api/project/create", requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      // Extract the created project data from the response
      const successData = await response.json();

      //Add the created project to the team's projects
      await context.dispatch("addProjectToTeam", { teamID, projectID: successData.createdProject._id });

      //Add the created project to the supervisor's projects
      await context.dispatch("addProjectToUser", {
        userID: successData?.createdProject?.supervisor,
        organizationID: context.rootGetters.selectedOrganizationID,
        projectID: successData.createdProject._id,
        projectName: successData.createdProject.name,
      });

      //Add the created project to the user's projects
      for (const userID of successData?.createdProject?.members) {
        await context.dispatch("addProjectToUser", {
          userID,
          organizationID: context.rootGetters.selectedOrganizationID,
          projectID: successData.createdProject._id,
          projectName: successData.createdProject.name,
        });
      }

      // Return the created team data
      return successData;
    } catch (error) {
      throw new Error(error.message || "Failed to create team.");
    }
  },
  async addProjectToTeam(_, payload) {
    const teamID = payload.teamID;
    const projectID = payload.projectID;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamID, projectID }),
    };

    try {
      const response = await fetch("/api/team/project", requestOptions);

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
  async addProjectToUser(context, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;
    const projectID = payload.projectID;
    const projectName = payload.projectName;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, organizationID, projectID }),
    };

    try {
      const response = await fetch("/api/user/project", requestOptions);

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
          taskBoardName: `Tasks for '${projectName}' project`,
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
  async getProjectData(context, payload) {
    const projectID = payload.projectID;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      const response = await fetch(`/api/project?projectID=${projectID}`, requestOptions);

      const data = await response.json();

      if (response.ok) {
        return data?.projectObj;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async getProjectMembers(context, payload) {
    const projectID = payload.projectID;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      const response = await fetch(`/api/project/members?projectID=${projectID}`, requestOptions);

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
  async getProjectSupervisor(context, payload) {
    const projectID = payload.projectID;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      const response = await fetch(`/api/project/supervisor?projectID=${projectID}`, requestOptions);

      const data = await response.json();

      if (response.ok) {
        return data?.projectSupervisor;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
};
