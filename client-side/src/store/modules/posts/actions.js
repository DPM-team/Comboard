export default {
  async addPosts(context) {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${context.getters.loggedUserToken}`);
    myHeaders.append("AuthorizationOrg", `${context.getters.selectedOrganizationID}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const postResponse = await fetch(`/api/org/${context.getters.selectedOrganizationID}/posts`, requestOptions);

    const posts = await postResponse.json();

    context.commit("setPosts", {
      posts,
    });
  },
};
