export default {
  selectOrganization(context, payload) {
    const organizationID = payload.organizationID;

    if (organizationID) {
      context.commit("setSelectedOrganization", { organizationID });
      localStorage.setItem("organizationID", organizationID);
    }
  },
  removeSelectedOrganization(context) {
    localStorage.removeItem("organizationID");
    localStorage.removeItem("profilephoto");

    context.commit("setSelectedOrganization", { organizationID: null });
  },
  async registerOrganization(context, payload) {
    const organizationObj = {
      name: payload.name,
      email: payload.email,
      telephone: payload.phone,
      vatNumber: payload.vatNumber,
      location: payload.location,
      websiteURL: payload.website,
    };

    // The user who created the organization and submits the form
    const userID = context.rootGetters.loggedUserID;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organizationObj, userID }),
    };

    try {
      const response = await fetch("/api/organization", requestOptions);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error); // Throw error to be caught in the component
      }

      try {
        const successData = await context.dispatch("createTaskBoard", {
          userID,
          organizationID: data?.organizationID,
          taskBoardName: "Personal Tasks",
        });

        console.log(successData);
      } catch (error) {
        console.log(error.message);
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Error creating new organization!");
    }
  },
  async joinOrganization(context, payload) {
    const organizationKey = payload.organizationKey;
    const userID = payload.userID;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organizationKey, userID }),
    };

    try {
      const response = await fetch("/api/organization/join", requestOptions);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error); // Throw error to be caught in the component
      }

      context.commit("addOrganization", { organizationID: data?.organizationID, organizationName: data?.organizationName });

      try {
        const successData = await context.dispatch("createTaskBoard", {
          userID,
          organizationID: data?.organizationID,
          taskBoardName: "Personal Tasks",
        });

        console.log(successData);
      } catch (error) {
        console.log(error.message);
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Error joining organization!");
    }
  },
  async getUserOrganizations(context, payload) {
    const userID = payload.userID;

    try {
      const response = await fetch(`/api/user/organizations?userID=${userID}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      context.commit("setOrganizations", data?.organizations);
    } catch (error) {
      throw new Error(error.message || "Error get user's organization!");
    }
  },
  async searchOrganizations(context, payload) {
    const startsWith = payload.startsWith.toLowerCase();

    const results = context.state.organizations.filter((organizationObj) => {
      return organizationObj.name.toLowerCase().startsWith(startsWith);
    });

    context.commit("setSearchedOrganizations", results);
    context.commit("toogleSearchIsMade", true);

    return results;
  },
  async getOrganizationPublicData(context, payload) {
    const organizationID = payload.organizationID;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      const response = await fetch(`/api/organization/data?organizationID=${organizationID}`, requestOptions);

      const data = await response.json();

      if (response.ok) {
        return data?.organizationObj;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message || "Error get organization!"); // Throw error to be caught in the component
    }
  },
  async getOrganizationGlobalPosts(context, payload) {
    const organizationID = payload.organizationID;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      const response = await fetch(`/api/organization/posts?organizationID=${organizationID}`, requestOptions);

      const data = await response.json();

      if (response.ok) {
        return data?.organizationGlobalPosts;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message || "Error get organization's posts!"); // Throw error to be caught in the component
    }
  },
  async getOrganizationUsers(_, payload) {
    const organizationID = payload.organizationID;

    try {
      const response = await fetch(`/api/organization/members?organizationID=${organizationID}`);

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
  async getOrganizationTeams(context, payload) {
    const organizationID = payload.organizationID;

    try {
      const response = await fetch(`/api/organization/teams?organizationID=${organizationID}`);

      const data = await response.json();

      if (response.ok) {
        context.commit("setAllTeamsArray", { allTeams: data?.teams });
        return data?.teams;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async getOrganizationProjects(context, payload) {
    const organizationID = payload.organizationID;

    try {
      const response = await fetch(`/api/organization/projects?organizationID=${organizationID}`);

      const data = await response.json();

      if (response.ok) {
        context.commit("setAllProjectsArray", { allProjects: data?.projects });
        return data?.projects;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  tryAutoOrganizationLoad(context) {
    const organizationID = localStorage.getItem("organizationID");

    if (organizationID) {
      context.commit("setSelectedOrganization", { organizationID });
    }
  },

  async updateOrganizationPhoto(context, payload) {
    try {
      const file = payload.file;
      const organizationID = payload.organizationID;
      const formdata = new FormData();
      formdata.append("upload", file, file.name);

      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
        body: formdata,
      };

      const response = await fetch(`/api/organization/upload/photo?organizationID=${organizationID}`, requestOptions);

      return response.blob();
    } catch (e) {
      throw new Error(e);
    }
  },
  async updateBannerImage(context, payload) {
    try {
      const file = payload.file;
      const organizationID = payload.organizationID;
      const formdata = new FormData();
      formdata.append("upload", file, file.name);

      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
        body: formdata,
      };

      const response = await fetch(`/api/organization/upload/banner?organizationID=${organizationID}`, requestOptions);

      return response.blob();
    } catch (e) {
      throw new Error(e);
    }
  },
  async takeOrganizationImage(context, payload) {
    try {
      const organizationID = payload.organizationID;

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
      };

      const response = await fetch(`/api/organization/image?organizationID=${organizationID}`, requestOptions);

      return response.blob();
    } catch (e) {
      throw new Error(e);
    }
  },
  async takeOrganizationBanner(context, payload) {
    try {
      const organizationID = payload.organizationID;

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
      };

      const response = await fetch(`/api/organization/banner?organizationID=${organizationID}`, requestOptions);

      return response.blob();
    } catch (e) {
      throw new Error(e);
    }
  },
  async sendJoinInvitation(context, payload) {
    const organizationName = payload.organizationName;
    const organizationPublicKey = payload.organizationPublicKey;
    const receiverEmail = payload.receiverEmail;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: JSON.stringify({ organizationName, organizationPublicKey, receiverEmail }),
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch(`/api/organization/invite`, requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      await response.json();

      context.dispatch("sendJoinInvitationAsNotification", { receiverEmail, organizationKey: organizationPublicKey, organizationName });
    } catch (error) {
      throw new Error(error.message || "Failed send invitation.");
    }
  },
  async sendJoinInvitationAsNotification(context, payload) {
    const receiverEmail = payload.receiverEmail;
    const organizationKey = payload.organizationKey;
    const organizationName = payload.organizationName;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: JSON.stringify({ organizationName, organizationKey, receiverEmail }),
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch(`/api/user/invite`, requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      await response.json();
    } catch (error) {
      throw new Error(error.message || "Failed send the notification.");
    }
  },
};
