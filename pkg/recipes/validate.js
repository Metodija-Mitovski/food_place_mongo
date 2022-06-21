const { Validator } = require("node-input-validator");

const CREATE = {
  title: "required|minLength:4|maxLength:25",
  category: "required",
  preparation_time: "required|between:5,500",
  no_people: "required|between:1,10",
  short_desc: "required|maxLength:240",
  description: "required|maxLength:1000",
  author: "required",
  image:"required"
};

const UPDATE = {
  title: "minLength:4|maxLength:25",
  preparation_time: "between:5,500",
  no_people: "between:1,10",
  short_desc: "maxLength:240",
  description: "maxLength:1000",
};

const validate = async (data, schema) => {
  let sch;
  switch (schema) {
    case "CREATE":
      sch = CREATE;
      break;

    case "UPDATE":
      sch = UPDATE;
      break;

    default:
      break;
  }

  let v = new Validator(data, sch);
  let match = await v.check();

  if (!match) {
    throw v.errors;
  }
};

module.exports = validate;
