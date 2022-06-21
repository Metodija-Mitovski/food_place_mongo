require("../../pkg/db");
const express = require("express");
const config = require("../../pkg/config");
const handlers = require("./handlers/auth");
const cookieParser = require("cookie-parser");
const middleware = require("../../pkg/middleware");

const api = express();

api.use(express.json());
api.use(cookieParser());

api.post("/api/v1/auth", handlers.createAccount);
api.post("/api/v1/auth/login", handlers.login);
api.patch("/api/v1/auth/verify/:id", handlers.verify);
api.patch("/api/v1/auth/update", middleware.auth, handlers.partialUpdate);
api.get("/api/v1/auth", middleware.auth, handlers.getAuthUser);
api.get("/api/v1/auth/logout", middleware.auth, handlers.logOut);

api.listen(config.get("services").auth.port, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on port ${config.get("services").auth.port} `);
});
