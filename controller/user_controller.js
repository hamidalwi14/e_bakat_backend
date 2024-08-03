const user = require("../model/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const { requestResponse } = require("../setup");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.loginUser = (username, password) =>
  new Promise((resolve, reject) => {
    console.log(username + " " + password);
    user
      .find({ username: username })
      .then((users) => {
        if (users.length === 0) {
          reject(requestResponse.account_not_found);
        } else {
          const hashed_password = users[0].password;
          if (bcrypt.compareSync(password, hashed_password)) {
            resolve({ message: username });
          } else {
            reject(requestResponse.account_not_found);
          }
        }
      })
      .catch((err) => reject(requestResponse.common_error));
  });

exports.registerUser = (data) =>
  new Promise((resolve, reject) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(data.password, salt);
      user
        .find({ username: data.username })
        .then((users) => {
          if (users.length > 0) {
            console.log("Username Sama");
            reject(requestResponse.username_already_use);
          } else {
            console.log("Username Berhasil");
            data.password = hash;
            user
              .create(data)
              .then((result) =>
                resolve(requestResponse.commonSuccessWithData(result))
              )
              .catch((err) => reject(requestResponse.commonError));
          }
        })
        .catch((err) => {
          reject(requestResponse.common_error);
        });
    } catch (err) {
      console.error(err);
      reject(requestResponse.common_error);
    }
  });

exports.getProfile = (username) =>
  new Promise((resolve, reject) => {
    user
      .find({ username: username })
      .select("-hashed_password")
      .then((users) => {
        resolve(requestResponse.commonSuccessWithData(users[0]));
      })
      .catch((err) => {
        console.log(err);
        reject(requestResponse.common_error);
      });
  });
