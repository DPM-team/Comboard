export default {
  async login(context, payload) {
    const username = payload.username;
    const password = payload.password;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };

    try {
      const response = await fetch("/api/login", requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      const successData = await response.json();

      localStorage.setItem("userID", successData.userObj._id);
      localStorage.setItem("token", successData.generatedToken);
      localStorage.setItem("name", successData.userObj.name);
      localStorage.setItem("surname", successData.userObj.surname);

      context.commit("setUser", {
        userID: successData.userObj._id,
        token: successData.generatedToken,
      });

      context.commit("setUserInfo", {
        name: successData.userObj.name,
        surname: successData.surname,
      });

      const profilePhoto = await fetch(`/api/users/${successData.userObj._id}/profilePhoto`);

      const photo = await profilePhoto.arrayBuffer();
      localStorage.setItem("profilePhoto", photo);

      context.commit("setProfilePhoto", {
        photo,
      });
    } catch (error) {
      throw new Error(error.message || "Internal Server Error: Failed to authenticate.");
    }
  },
  async register(context, payload) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        surname: payload.surname,
        username: payload.username,
        email: payload.email,
        password: payload.password,
      }),
    };

    try {
      const response = await fetch("/api/register", requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      const successData = await response.json();

      localStorage.setItem("userID", successData.userObj._id);
      localStorage.setItem("token", successData.generatedToken);

      context.commit("setUser", {
        userID: successData.userObj._id,
        token: successData.generatedToken,
      });
    } catch (error) {
      throw new Error(error.message || "Internal Server Error: Failed to register.");
    }
  },
  tryAutoLogin(context) {
    const userID = localStorage.getItem("userID");
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const surname = localStorage.getItem("surname");

    if (userID && token) {
      context.commit("setUser", {
        userID,
        token,
      });
    }

    if (name && surname) {
      context.commit("setUserInfo", {
        name,
        surname,
      });
    }
  },
  async logout(context) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.getters.loggedUserToken}`,
      },
    };

    try {
      const response = await fetch("/api/logout", requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      const successData = await response.json();

      // Remove the logged User from the local storage
      localStorage.removeItem("userID");
      localStorage.removeItem("token");

      context.commit("setUser", {
        userID: null,
        token: null,
      });

      context.dispatch("removeSelectedOrganization");

      return successData;
    } catch (error) {
      throw new Error(error.message || "Internal Server Error: Failed to logout.");
    }
  },
};
