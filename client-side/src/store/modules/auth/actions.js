export default {
  async login(context, payload) {
    let error = null;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password,
      }),
    };

    try {
      await fetch("/api/login", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            error = new Error(data.error);
          } else {
            localStorage.setItem("userID", data.userObj._id);
            localStorage.setItem("token", data.generatedToken);

            context.commit("setUser", {
              userID: data.userObj._id,
              token: data.generatedToken,
            });
          }
        });
    } catch (e) {
      return new Error("Internal Server Error: Failed to authenticate.");
    }

    if (error) {
      return error;
    }
  },
  async register(context, payload) {
    let error = null;

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
      await fetch("/api/register", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            error = new Error(data.error);
          } else {
            localStorage.setItem("userID", data.userObj._id);
            localStorage.setItem("token", data.generatedToken);

            context.commit("setUser", {
              userID: data.userObj._id,
              token: data.generatedToken,
            });
          }
        });
    } catch (e) {
      return new Error("Internal Server Error: Failed to register.");
    }

    if (error) {
      return error;
    }
  },
  tryAutoLogin(context) {
    const userID = localStorage.getItem("userID");
    const token = localStorage.getItem("token");

    if (userID && token) {
      context.commit("setUser", {
        userID,
        token,
      });
    }
  },
  logout(context) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.getters.loggedUserToken}`,
      },
    };

    fetch("/api/logout", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });

    // Remove the logged User from the local storage
    localStorage.removeItem("userID");
    localStorage.removeItem("token");

    context.commit("setUser", {
      userID: null,
      token: null,
    });
  },
};
