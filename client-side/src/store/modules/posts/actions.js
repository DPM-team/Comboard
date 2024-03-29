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
    const organizationID = payload.organizationID;
    const skip = payload.skip;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      const response = await fetch(`/api/network/posts?organizationID=${organizationID}&skip=${skip}`, requestOptions);

      const data = await response.json();

      if (response.ok) {
        context.commit("setPosts", {
          posts: data?.allPosts,
        });

        return data;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async loadMyPosts(context, payload) {
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
      const response = await fetch(`/api/network/myposts?userID=${userID}&organizationID=${organizationID}`, requestOptions);

      const data = await response.json();

      if (response.ok) {
        return data?.posts;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async createPost(context, payload) {
    const organizationID = payload.organizationID;
    const postObj = payload.postObj;
    const postMedia = payload.postMedia;

    const formData = new FormData();
    if (postMedia) {
      formData.append("upload", postMedia, postMedia.name);
    }
    formData.append("postObj", JSON.stringify(postObj));
    formData.append("organizationID", organizationID);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: formData,
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
        body: JSON.stringify({ content: payload.content }),
        redirect: "follow",
      };

      const response = await fetch(`/api/post/${payload.postID}/createComment`, requestOptions);

      return response.json();
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

      const response = await fetch(`/api/post/${payload.postID}/comments?orgID=${context.rootGetters.selectedOrganizationID}`, requestOptions);

      const comments = await response.json();

      return comments;
    } catch (e) {
      throw new Error(e);
    }
  },

  async loadUsersLikePost(context, payload) {
    const organizationID = payload.organizationID;
    const postID = payload.postID;
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
      };

      const response = await fetch(`/api/post/like/users?organizationID=${organizationID}&postID=${postID}`, requestOptions);

      const users = response.json();

      return users;
    } catch (e) {
      throw new Error(e);
    }
  },

  async editPost(context, payload) {
    try {
      const postID = payload.postID;
      const organizationID = payload.organizationID;
      const editContent = payload.editText;

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
        body: JSON.stringify({ content: editContent }),
      };

      const response = await fetch(`/api/post/edit?postID=${postID}&organizationID=${organizationID}`, requestOptions);

      return await response.json();
    } catch (e) {
      throw new Error(e);
    }
  },
  async deletePost(context, payload) {
    try {
      const postID = payload.postID;
      const organizationID = payload.organizationID;

      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
      };

      const response = await fetch(`/api/post/delete?postID=${postID}&organizationID=${organizationID}`, requestOptions);

      return await response.json();
    } catch (e) {
      throw new Error(e);
    }
  },

  async getPostMedia(context, payload) {
    try {
      const organizationID = payload.organizationID;
      const postID = payload.postID;

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
      };

      const response = await fetch(`/api/post/media?organizationID=${organizationID}&postID=${postID}`, requestOptions);

      return await response.blob();
    } catch (e) {
      throw new Error(e);
    }
  },
};
