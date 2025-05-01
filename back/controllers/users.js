const users = require("../data/users");
const { validationResult } = require("express-validator");

const getUsers = (req, res) => {
  const result = validationResult(req);
  res.status(200).json(users);
};

const createUsers = (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "Usuario creado correctamente" });
};
const authenticatorUser = (req, res) => {
  console.log(req.body);
  res.status(202).json({ message: "Usuario registrado " });
};

const swipeUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  if (user.isMatch) {
    res
      .status(202)
      .json({ message: "Usuario " + user.firstName + " te ha dado dislike" });
  }
  res
    .status(202)
    .json({ message: "Usuario " + user.firstName + " te ha dado like" });
};

const matchUser = (req, res) => {
  const matchUsers = users.filter((user) => user.isMatch);
  res.status(202).json(matchUsers);
};

module.exports = {
  getUsers,
  createUsers,
  authenticatorUser,
  swipeUser,
  matchUser,
};
