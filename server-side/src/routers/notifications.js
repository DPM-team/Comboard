const express = require("express");
const authentication = require("../middleware/authentication");
const notificationCotroller = require("../controllers/notificationsController");
const Data = require("../models/data");

const router = new express.Router();

//This is the router which runs when one user tries to logout from one device.
router.get("/api/user/organization/notifications", authentication, notificationCotroller.getNotifications);

module.exports = router;
