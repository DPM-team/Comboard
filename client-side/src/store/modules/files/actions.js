export default {
  async getFiles(context, payload) {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${context.store.loggedUserToken}`);

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const files = await fetch(`/api/user/files?limit=10&skip=${payload.skip}`, requestOptions);
      return files.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
