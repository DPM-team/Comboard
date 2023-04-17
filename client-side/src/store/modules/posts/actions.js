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

  async addLike(context, payload) {
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${context.getters.loggedUserToken}`);
    headers.append("AuthorizationOrg", `${context.getters.selectedOrganizationID}`);
    headers.append("Content-Type", "application/json");

    let requestOptions = {
      method: "put",
      headers,
      body: JSON.stringify({ like: !this.haveLike }),
    };

    await fetch(`/api/user/like/post/${payload.id}`, requestOptions);
  },

  async isLiked(context, payload) {
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${context.getters.loggedUserToken}`);
    headers.append("AuthorizationOrg", `${context.getters.selectedOrganizationID}`);

    let requestOptions = {
      method: "get",
      headers,
    };

    const respones = await fetch(`/api/user/like/post/${payload.id}`, requestOptions);

    return respones;
  },
  async createPost(context, payload) {
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${context.getters.loggedUserToken}`);
    headers.append("AuthorizationOrg", `${context.getters.selectedOrganizationID}`);
    headers.append("Content-Type", "application/json");

    let body = JSON.stringify({
      userId: context.getters.loggedUserID,
      orgId: context.getters.selectedOrganizationID,
      contentString: payload.post,
    });

    let options = {
      method: "POST",
      headers,
      body,
    };

    await fetch("/api/user/post", options);
  },
};
