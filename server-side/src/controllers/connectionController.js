const { default: mongoose } = require("mongoose");
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

    console.log("");

    await userOrgData.populate({ path: "organizationID", model: "organization", populate: { path: "users", model: "user" } });

    console.log();

    let recommentedConnections = [];
    let organizationsUsers = userOrgData.organizationID.users.filter((user, i) => {
      if (
        !userOrgData.connections.includes(user._id) &&
        user._id.toString() !== req.user._id.toString() &&
        !userOrgData.pendingRequestsSend.includes(user._id) &&
        !userOrgData.pendingRequestsReceive.includes(user._id)
      ) {
        return user;
      }
    });

    for (let i = 0; i < 4; i++) {
      if (userOrgData.organizationID.users.length < 4 && userOrgData.organizationID.users.length === i) {
        break;
      }
      let roundomNumber = Math.round(Math.random() * (organizationsUsers.length - 1));

      let selectedUser = organizationsUsers[roundomNumber];

      let index = organizationsUsers.findIndex((user) => user._id === selectedUser._id);

      console.log(index);

      if (index > -1) {
        organizationsUsers.splice(index, 1);
        recommentedConnections.push(selectedUser);
      }
    }

    recommentedConnections = recommentedConnections.map((conection) => {
      return {
        id: conection._id,
        name: conection.name,
        surname: conection.surname,
      };
    });

    res.status(201).send(recommentedConnections);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const answerRequestConnection = async (req, res) => {
  try {
    const notificationID = req.body.notificationID;

    if (!notificationID) {
      new Error("Notification ID is required");
    }

    const orgID = req.query.orgID;

    if (!orgID) {
      return new Error();
    }

    const userNobody = await userExists(req.params.userRequestConnectionID);

    if (userNobody?.error) {
      throw new Error("No user for request");
    }

    const acceptConnection = req.body.acceptConnection;

    if (acceptConnection === undefined) {
      throw new Error("Must be required");
    }

    const userOrgData = await Data.findOne({ userID: req.user._id, orgID });

    if (!userOrgData) {
      throw new Error("No user ");
    }

    const userOrgDataRequestConnection = await Data.findOne({ userID: req.params.userRequestConnectionID, orgID });

    if (!userOrgDataRequestConnection) {
      throw new Error("Error user data now");
    }

    const pendingRequestIndex = userOrgData.pendingRequestsReceive.findIndex((userId) => {
      return userId.toString() === req.params.userRequestConnectionID;
    });

    const sendingRequestIndex = userOrgDataRequestConnection.pendingRequestsSend.findIndex((userId) => {
      return userId.toString() === req.user._id.toString();
    });

    if (pendingRequestIndex === -1 || sendingRequestIndex === -1) {
      throw new Error("Not exists");
    }

    const notification = await Notification.findById(notificationID).select("from userID");

    if (!notification) {
      return new Error();
    }

    if (notification.from.toString() !== userOrgDataRequestConnection.userID.toString() || notification.userID.toString() !== req.user._id.toString()) {
      return;
    }

    const notificationIndex = userOrgData.notifications.findIndex((notificationID) => {
      return notification._id.toString() === notificationID.toString();
    });

    if (notificationIndex === 1) {
      return new Error();
    }

    userOrgData.notifications.splice(notificationIndex, 1);

    await notification.delete();

    userOrgData.pendingRequestsReceive.splice(pendingRequestIndex, 1);
    userOrgDataRequestConnection.pendingRequestsSend.splice(req.user._id, 1);

    if (acceptConnection) {
      userOrgData.connections.push(req.params.userRequestConnectionID);
      userOrgDataRequestConnection.connections.push(req.user._id);
    }

    await userOrgData.save();
    await userOrgDataRequestConnection.save();

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  toogleConnection,
  recommentedConnections,
  answerRequestConnection,
};
