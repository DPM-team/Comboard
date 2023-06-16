const mongoose = require("mongoose");

const notificationsSchema = mongoose.Schema(
  {
    entity: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },

    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Notifications = mongoose.model("notification", notificationsSchema);

module.exports = Notifications;
