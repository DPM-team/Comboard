export default {
  async login(context, payload) {
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
            throw new Error(data.message);
          } else {
            console.log(data);
            localStorage.setItem("userID", data.userObj._id);
            localStorage.setItem("token", data.generatedToken);

            context.commit("setUser", {
              userID: data.userObj._id,
              token: data.generatedToken,
            });
          }
        });
    } catch (e) {
      return new Error(e.message);
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
      await fetch("/api/register", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          } else {
            console.log(data);
            localStorage.setItem("userID", data.userObj._id);
            localStorage.setItem("token", data.generatedToken);

            context.commit("setUser", {
              userID: data.userObj._id,
              token: data.generatedToken,
            });
          }
        });
    } catch (e) {
      return new Error(e.message);
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
    // Remove the logged User from the local storage
    localStorage.removeItem("userID");
    localStorage.removeItem("token");

    context.commit("setUser", {
      userID: null,
      token: null,
    });
  },
};
