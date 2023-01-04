const server = require("./app.js");

const port = process.env.PORT || 3000;

server.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server is up on port ${port}!`);
  }
});
