export default {
  async registerOrganization(_, payload) {
    const organizationObj = {
      name: payload.name,
      email: payload.email,
      telephone: payload.phone,
      vatNumber: payload.vatNumber,
      location: payload.location,
      websiteURL: payload.website,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(organizationObj),
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
};
