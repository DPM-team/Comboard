export default {
  async getUser(_, payload) {
    const userID = payload.userID;

    try {
      const response = await fetch(`/api/user?userID=${userID}`);

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async getUserDataForAnOrganization(context, payload) {
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
      const response = await fetch(`/api/user/orgdata?userID=${userID}&organizationID=${organizationID}`, requestOptions);

      const data = await response.json();

      if (response.ok) {
        return data.userObj;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async getUserTeams(context, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;

    try {
      const response = await fetch(`/api/user/teams?userID=${userID}&organizationID=${organizationID}`);

      const data = await response.json();

      if (response.ok) {
        context.commit("setMyTeamsArray", { myTeams: data?.teams });
        return data?.teams;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async getUserProjects(context, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;

    try {
      const response = await fetch(`/api/user/projects?userID=${userID}&organizationID=${organizationID}`);

      const data = await response.json();

      if (response.ok) {
        context.commit("setMyProjectsArray", { myProjects: data?.projects });
        return data?.projects;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async getUserConnections(context, payload) {
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
      const response = await fetch(`/api/user/connections?userID=${userID}&organizationID=${organizationID}`, requestOptions);

      const data = await response.json();

      if (response.ok) {
        return data.connections;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async requestConnection(context, payload) {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
      };

      const request = await fetch(`/api/user/requestConnection?userId=${payload.userId}&orgID=${payload.orgID}`, requestOptions);

      if (!request.ok) {
        throw new Error();
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  async recommentedConnections(context, payload) {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
      };

      const response = await fetch(`/api/organization/recommentedConnections?orgID=${payload.orgID}`, requestOptions);

      const reccomentedConnections = await response.json();

      return reccomentedConnections;
    } catch (e) {
      console.log(e);
      throw new Error();
    }
  },
  async acceptConnection(context, payload) {
    const acceptConnection = payload.accept;
    const notificationID = payload.notificationID;
    const userConnectionID = payload.userConnectionID;
    const orgID = payload.orgID;

    try {
      const requestsOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ acceptConnection, notificationID }),
      };

      const response = await fetch(`/api/organization/user/${userConnectionID}/connection?orgID=${orgID}`, requestsOptions);

      if (!response.ok) {
        throw new Error();
      }
    } catch (error) {
      return new Error();
    }
  },
  async getUserProfile(context, payload) {
    try {
      const userID = payload.userID;
      const organizationID = payload.organizationID;

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
      };

      const response = await fetch(`/api/user/profilephoto?userID=${userID}&organizationID=${organizationID}`, requestOptions);

      return await response.blob();
    } catch (e) {
      throw new Error(e);
    }
  },

  async updateProfilePhoto(context, payload) {
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

      const response = await fetch(`/api/user/upload/profilephoto?organizationID=${organizationID}`, requestOptions);

      return response.blob();
    } catch (e) {
      throw new Error(e);
    }
  },
  async updateBanner(context, payload) {
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

      const response = await fetch(`/api/user/upload/bannerphoto?organizationID=${organizationID}`, requestOptions);

      return response.blob();
    } catch (e) {
      throw new Error(e);
    }
  },
  async updateProfileData(context, payload) {
    try {
      const organizationID = payload.organizationID;
      const formData = payload.formData;

      const object = Object.fromEntries(formData.entries());
      let filterData = {};

      for (const entity in object) {
        if (object[entity]) {
          filterData[entity] = object[entity];
        }
      }

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
        body: JSON.stringify(filterData),
      };

      const response = await fetch(`/api/user/edit/profiledata?organizationID=${organizationID}`, requestOptions);

      console.log(response);
    } catch (e) {
      console.log(e);
      throw new Error();
    }
  },
};
