const fs = require("fs");

const configFile = `${__dirname}/../../config.json`;
let config = null;

if (!config) {
  let cf = fs.readFileSync(configFile, "utf-8");
  config = JSON.parse(cf);
}

const get = (section) => {
  if (config[section]) {
    return config[section];
  }
  return null;
};

module.exports = {
  get,
};
