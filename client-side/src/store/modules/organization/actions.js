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

    return new Promise((resolve, reject) => {
      try {
        fetch("/api/organization", requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.error) {
              reject(new Error(data.error));
            } else {
              resolve(data);
            }
          });
      } catch (error) {
        reject(new Error(error));
      }
    });
  },
  async joinOrganization(context, payload) {
    const organizationKey = payload.organizationKey;
    const userID = context.rootGetters.loggedUserID;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organizationKey, userID }),
    };

    return new Promise((resolve, reject) => {
      try {
        fetch("/api/organization/join", requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.error) {
              reject(new Error(data.error));
            } else {
              context.commit("addOrganization", { organizationID: data.organizationID, organizationName: data.organizationName });

              resolve(data);
            }
          });
      } catch (error) {
        reject(new Error(error));
      }
    });
  },
  async getUserOrganizations(context, payload) {
    const userID = payload.userID;

    try {
      await fetch(`/api/user/organizations?userID=${userID}`)
        .then((response) => {
          // To catch errors from server (e.g. server isn't running)
          if (!response.ok) {
            throw new Error("Failed to fetch!");
          }

          return response.json();
        })
        .then((data) => {
          // To catch errors like user don't found or other error that caused by the server while is on
          if (data.error) {
            throw new Error(data.error);
          }

          const organizations = new Array();

          for (const index in data.organizations) {
            const organizationObj = {
              _id: data.organizations[index]._id,
              name: data.organizations[index].name,
            };

            organizations.push(organizationObj);
          }

          context.commit("setOrganizations", organizations);
        });
    } catch (error) {
      // Fror there, the error will return to the component that calls the action method
      throw new Error(error.message);
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
  tryAutoOrganizationLoad(context) {
    const organizationID = localStorage.getItem("organizationID");

    if (organizationID) {
      context.commit("setSelectedOrganization", { organizationID });
    }
  },
};
