const { Validator } = require("node-input-validator");

const CREATE = {
  first_name: "required|minLength:3|maxLength:15|string",
  last_name: "required|minLength:4|maxLength:15|string",
  email: "required|email",
  password: "required|minLength:8|maxLength:30|string",
  birthday: "required|maxLength:10",
};

const UPDATE = {
  first_name: "minLength:3|maxLength:15|string",
  last_name: "minLength:4|maxLength:15|string",
  email: "email",
  password: "minLength:8|maxLength:30|string",
  birthday: "maxLength:10",
};

const LOGIN = {
  email: "required|email",
  password: "required",
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

    case "LOGIN":
      sch = LOGIN;
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
