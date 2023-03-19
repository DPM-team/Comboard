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

    try {
      await fetch("/api/organization", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          // We got the key
          console.log(data);
        });
    } catch (error) {
      return new Error(error.message);
    }
  },
};
