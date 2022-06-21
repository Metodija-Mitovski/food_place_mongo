require("../../pkg/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("../../pkg/config");
const handlers = require("./handlers/recipes");
const middleware = require("../../pkg/middleware");

const api = express();

api.use(express.json());
api.use(cookieParser());

api.post("/api/v1/recipes", middleware.auth, handlers.create);
api.patch("/api/v1/recipes/:id", middleware.auth, handlers.update);
api.delete("/api/v1/recipes/:id", middleware.auth, handlers.removeOne);
api.get("/api/v1/recipes/me", middleware.auth, handlers.getMine);
api.get("/api/v1/recipes/latest", handlers.getLatest);
api.get("/api/v1/recipes/top-rated", handlers.getTopRated);
api.get("/api/v1/recipes/:category", handlers.getCategory);
api.patch("/api/v1/recipes/rating/:id",middleware.auth, handlers.updateLike);

api.listen(config.get("services").recipe.port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started at port ${config.get("services").recipe.port}`);
});
