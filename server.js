const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./src/Action");

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("socket connected", socket.id);

    socket.on(ACTIONS.JOIN, ({roomId, username}) => {
        
    });
});

// server listning port
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});


// 2:17:00