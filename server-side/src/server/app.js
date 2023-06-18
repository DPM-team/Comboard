const express = require("express");
require("../database/mongoose");
const http = require("http");
const bodyParser = require("body-parser");
const Notification = require("../models/notifications");

// Import routers
const connectRouter = require("../routers/connect.js");
const userRouter = require("../routers/user.js");
const logoutRouter = require("../routers/logout.js");
const uploadRouter = require("../routers/upload.js");
const postRouter = require("../routers/post.js");
const teamRouter = require("../routers/team.js");
const projectRouter = require("../routers/project.js");
const organizationRouter = require("../routers/organization.js");
const connectionRouter = require("../routers/connections.js");
const notificationsRouter = require("../routers/notifications.js");
const tasksRouter = require("../routers/tasks.js");
const errorRouter = require("../routers/error.js");
const socketio = require("socket.io");
const { lchown } = require("fs");

const app = express();
// We use http module because in socket.io library, we need to pass as argument the HTTP server, but express alone, creates the server behind the scenes and we don't have access to the HTTP server
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", async ({ userID, name, surname, room }) => {
    socket.join(room);
    //This is for organization's members
    const entityOrganization = room;
    const notification = new Notification({ entity: entityOrganization, from: userID, content: `New member Organization ${name} ${surname} has added on Board!`, type: "member" });
    await notification.save();
    socket.broadcast.to(room).emit("member", notification);
  });
  socket.on("create-team", async (userID, room, team) => {
    const notification = new Notification({ entity: room, from: userID, content: `New team with name ${team.name} has been created` });
    await notification.save();
    socket.broadcast.to(room).emit("create-team", notification);
  });
  socket.on("create-project", async (userID, room, project) => {
    const notification = new Notification({ entity: room, from: userID, content: `New project with name ${project.name} has been created` });
    await notification.save();
    socket.broadcast.to(room).emit("create-project", notification);
  });
  socket.on("organization-dashboard", ({ room }) => {
    socket.join(room);

    socket.on("request-connection", (userID, room) => {
      socket.join(room);
      socket.to().emit();
    });
  });
  socket.on("disconnect", () => {
    console.log(this);
  });
});

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Config the routers
app.use(connectRouter);
app.use(logoutRouter);
app.use(uploadRouter);
app.use(postRouter);
app.use(connectionRouter);
app.use(teamRouter);
app.use(projectRouter);
app.use(organizationRouter);
app.use(notificationsRouter);
app.use(userRouter);
app.use(tasksRouter);
// This must be the last
app.use(errorRouter);

module.exports = { server, io };
