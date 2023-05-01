const Data = require("../models/data.js");
const Notification = require("../models/notifications.js");
const User = require("../models/user.js");
const { userExists } = require("../utils/userUtils.js");

const toogleConnection = async (req, res) => {
  try {
    const userFromRequest = req.user;
    const userToRequest = await User.findOne({ _id: req.query.userId });

    if (!userToRequest) {
      throw new Error("");
    }

    const userFromRequestData = await Data.findOne({ userID: userFromRequest._id, organizationID: req.query.orgID });
    const userToRequestData = await Data.findOne({ userID: userToRequest._id, organizationID: req.query.orgID });

    if (!userFromRequestData || !userToRequestData) {
      throw new Error();
    }

    if (
      !userFromRequestData.connections.includes(userToRequest._id) &&
      !userFromRequestData.pendingRequestsSend.includes(userToRequest._id) &&
      !userToRequestData.pendingRequestsReceive.includes(userFromRequest._id)
    ) {
      userFromRequestData.pendingRequestsSend.push(userToRequest._id);
      userToRequestData.pendingRequestsReceive.push(userFromRequest._id);
      const notification = new Notification({
        userID: userToRequest._id,
        from: userFromRequest._id,
        type: "connection",
      });
      await notification.save();
      userToRequestData.notifications.push(notification._id);
    } else if (userFromRequestData.pendingRequestsSend.includes(userToRequest._id) && userToRequestData.pendingRequestsReceive.includes(userFromRequest._id)) {
      userFromRequestData.pendingRequestsSend.remove(userToRequest._id);
      userToRequestData.pendingRequestsReceive.remove(userFromRequest._id);
      const notification = await Notification.findOne({ from: userFromRequest._id, type: "connection" });
      userToRequestData.notifications.remove(notification._id);
      await notification.delete();
    }

    await userFromRequestData.save();
    await userToRequestData.save();

    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const recommentedConnections = async (req, res) => {
  try {
    const userOrgData = await Data.findOne({ userID: req.user._id, organizationID: req.query.orgID });

    if (!userOrgData) {
      throw new Error();
    }

    await userOrgData.populate({ path: "organizationID", model: "organization", populate: { path: "users", model: "user" } });

    let recommentedConnections = [];

    for (let i = 0; i < 4; i++) {
      let roundomNumber = Math.round(Math.random() * (userOrgData.organizationID.users.length - 1));

      let selectedUser = userOrgData.organizationID.users[roundomNumber];

      if (
        !recommentedConnections.includes(selectedUser) &&
        selectedUser.email !== req.user.email &&
        !userOrgData.connections.includes(selectedUser._id) &&
        !userOrgData.pendingRequestsReceive.includes(selectedUser._id) &&
        !userOrgData.pendingRequestsSend.includes(selectedUser._id)
      ) {
        recommentedConnections.push(selectedUser);
      }

      if (userOrgData.organizationID.users.length < 4 && userOrgData.organizationID.users.length === i) {
        break;
      }
    }

    recommentedConnections = recommentedConnections.map((conection) => {
      return {
        id: conection._id,
        name: conection.name,
        surname: conection.surname,
      };
    });

    // console.log(recommentedConnections);
    res.status(201).send(recommentedConnections);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const answerRequestConnection = async (req, res) => {
  try {
    const userOrgData = await Data.findOne({ userID: req.user._id, orgID: req.query.orgID });

    if (!userOrgData) {
      throw new Error("No user");
    }

    const userNobody = await userExists(req.params.userRequestConnectionID);

    if (userNobody?.error) {
      throw new Error("No user for request");
    }

    if (!req.body.acceptConnection) {
      throw new Error("Must be required");
    }

    const userOrgDataRequestConnection = await Data.findOne({ userID: req.params.userRequestConnectionID, orgID: req.query.orgID });

    if (!userOrgDataRequestConnection) {
      throw new Error("Error user data now");
    }

    if (!userOrgData.pendingRequestsReceive.includes(req.params.userRequestConnectionID) || !userOrgDataRequestConnection.pendingRequestsSend.includes(req.user._id)) {
      throw new Error("Not exists");
    }

    userOrgData.pendingRequestsReceive.remove(req.params.userRequestConnectionID);
    userOrgDataRequestConnection.pendingRequestsSend.remove(req.user._id);

    if (req.body.acceptConnection) {
      userOrgData.connections.push(req.params.userRequestConnectionID);
      userOrgDataRequestConnection.connections.push(req.user._id);
    }

    await userOrgData.save();
    await userOrgDataRequestConnection.save();

    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  toogleConnection,
  recommentedConnections,
  answerRequestConnection,
};
