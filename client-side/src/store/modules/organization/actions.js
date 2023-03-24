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

    const promise = await fetch("/api/organization", requestOptions);

    return promise;
  },
};
