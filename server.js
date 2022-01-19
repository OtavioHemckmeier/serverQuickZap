const express = require("./config/express")

// Usa env ou default
const port = process.env.PORT || 5000;

// Inicia o server
const app = express.init();
const server = require("http").createServer(app);
server.listen(port, () => console.log(`Server now running on port ${port}!`));