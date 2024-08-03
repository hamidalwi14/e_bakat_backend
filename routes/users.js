"use strict";
const auth = require("basic-auth");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const userController = require("../controller/user_controller");
var config = require("../config/config.json");
const fs = require("fs");

module.exports = (router) => {
  router.get("/", (req, res) => res.end("E-BAKAT"));

  router.post("/users/signin", (req, res) => {
    try {
      userController
        .loginUser(req.body.username, req.body.password)
        .then((result) => {
          let username = result.message;
          userController
            .getProfile(username)
            .then((result) => {
              res.json(result);
            })
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    } catch (err) {
      console.log(err);
    }
  });

  router.post("/users/signup", (req, res) => {
    let data = req.body;
    console.log(data);
    userController
      .registerUser(data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
