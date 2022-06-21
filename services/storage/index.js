const express = require("express");
const fileUpload = require("express-fileupload");
const config = require("../../pkg/config");
const path = require("path");
const handlers = require("./handlers/storage");
const middleware = require("../../pkg/middleware");
const cookieParser = require("cookie-parser");

const api = express();

api.use(fileUpload());
api.use(cookieParser());
api.use(
    "/api/v1/storage",
    express.static(path.join(__dirname, "/../../files"))
);
api.use(middleware.auth);

api.post("/api/v1/storage", handlers.upload);

api.listen(config.get("services").storage.port, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log(`Server started at port ${config.get("services").storage.port}`);
});
