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
};
