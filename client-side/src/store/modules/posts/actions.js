export default {
  async isLiked(context, payload) {
    const userID = payload.userID;
    const postID = payload.postID;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      const response = await fetch(`/api/post/isliked?userID=${userID}&postID=${postID}`, requestOptions);

      const data = await response.json();

      if (response.ok) {
        return data?.isLiked;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async loadPosts(context, payload) {
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
      const response = await fetch(`/api/network/posts?userID=${userID}&organizationID=${organizationID}`, requestOptions);

      const data = await response.json();

      if (response.ok) {
        context.commit("setPosts", {
          posts: data?.posts,
        });

        return data?.succesMessage;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async createPost(context, payload) {
    const postObj = payload.postObj;
    const organizationID = payload.organizationID;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: JSON.stringify({ postObj, organizationID }),
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch("/api/post", requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      const successData = await response.json();

      return successData;
    } catch (error) {
      throw new Error(error.message || "Failed to create post.");
    }
  },
  async toogleLike(context, payload) {
    const postID = payload.postID;
    const userID = payload.userID;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch(`/api/post/like?postID=${postID}&userID=${userID}`, requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      const successData = await response.json();

      return successData;
    } catch (error) {
      throw new Error(error.message || "Failed to toogle like.");
    }
  },

  async createComment(context, payload) {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
          AuthorizationOrg: `${context.rootGetters.selectedOrganizationID}`,
        },
        body: JSON.stringify({ context: payload.content }),
        redirect: "follow",
      };

      await fetch(`/api/post/${payload.postID}/createComment`, requestOptions);
    } catch (e) {
      throw new Error(e);
    }
  },

  async loadCommentsOfPost(context, payload) {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
      };

      await fetch(`/api/post/${payload.postID}/comments?orgID=${context.rootGetters.selectedOrganizationID}`, requestOptions);
    } catch (e) {
      throw new Error(e);
    }
  },
};
