const express = require("express"),
    bodyParser = require("body-parser"),
    quickZap = require("../routes/quickZapRoutes"),
    cors = require("cors");

module.exports.init = () => {
    // Inicializa o app
    const app = express();

    app.use(cors());

    // Middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Rotas
    app.use("/api", quickZap);

    return app;
};
