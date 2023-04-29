export default {
  async loadNotifications(context, payload) {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: context.rootGetters.loggedUserToken,
        },
      };

      const response = await fetch(`/api/user/organization/notifications?orgID=${payload.orgID}`, requestOptions);

      if (!response) {
        throw new Error();
      }

      return await response.json();
    } catch (error) {
      throw new Error();
    }
  },
};
