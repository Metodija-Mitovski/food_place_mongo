const express = require("express");
const config = require("../../pkg/config");
const path = require("path");
const proxy = require("express-http-proxy");

const api = express();

api.use(
  "/api/v1/auth",
  proxy("http://localhost:10001", {
    proxyReqPathResolver: (req) =>
      `http://localhost:10001/api/v1/auth${req.url}`,
  })
);

api.use(
  "/api/v1/storage",
  proxy("http://localhost:10003", {
    proxyReqPathResolver: (req) =>
      `http://localhost:10003/api/v1/storage${req.url}`,
  })
);

api.use(
  "/api/v1/recipes",
  proxy("http://localhost:10004", {
    proxyReqPathResolver: (req) =>
      `http://localhost:10004/api/v1/recipes${req.url}`,
  })
);

api.use(
  "/",
  proxy("http://localhost:3000", {
    proxyReqPathResolver: (req) => `http://localhost:3000${req.url}`,
  })
);

const PORT = process.env.PORT || config.get("services").proxy.port;

api.use("/", express.static(path.join(__dirname, "/../../public/build")));

api.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started at port ${PORT}`);
});
