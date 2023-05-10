const Data = require("../models/data.js");

const getNotifications = async function (req, res) {
  try {
    const userOrgData = await Data.findOne({ userID: req.user._id, orgID: req.query.orgID });

    if (!userOrgData) {
      throw new Error();
    }

    await userOrgData.populate({ path: "notifications", model: "notification" });

    const notifications = userOrgData.notifications;

    res.status(200).send({ message: "Correct load of notifications!", notifications });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getNotifications,
};
