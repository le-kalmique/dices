const express = require("express");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
var argv = require("minimist")(process.argv.slice(2));

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;
if (argv.port) {
  port = argv.port;
}

io.on("connect", (socket) => {
  socket.emit("now", {
    message: "hello",
  });

  socket.on("UserConnected", (data) => {
    socket.join(data.room);
    socket.to(data.room).emit("UserAdd", { newUsers: data.users });
  });

  socket.on("DicesRoll", (data) => {
    socket.to(data.room).emit("DicesRoll", data.dices);
  });
});

nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on localhost:${port}`);
  });
});
