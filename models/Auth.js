const express = require("express");
const bcrypt = require("bcrypt");
const pg = require("../helpers/connect_db");
const queryAuth = require("../helpers/queryAuth");
const jwt = require("jsonwebtoken");
const fromResponse = require("../helpers/fromResponse");

const authModel = {
  login: (request) => {
    return new Promise((resolve, reject) => {
      const { password } = request;
      const query = queryAuth.login(request);
      pg.query(query, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse("Wrong email/password", 400));
          } else {
            bcrypt.compare(
              password,
              result.rows[0].password,
              (errComp, resComp) => {
                if (!errComp) {
                  if (resComp) {
                    const payload = {
                      id: result.rows[0].id,
                      role: result.rows[0].role,
                    };
                    jwt.sign(
                      payload,
                      process.env.SECRET_KEY,
                      (errToken, resToken) => {
                        if (!errToken) {
                          resolve(
                            fromResponse("Login success", 200, {
                              id: result.rows[0].id,
                              role: result.rows[0].role,
                              token: resToken,
                            })
                          );
                        } else {
                          reject({
                            message: "Login error",
                            statusCode: 500,
                          });
                        }
                      }
                    );
                  } else {
                    reject(fromResponse("Wrong email/password", 400));
                  }
                } else {
                  reject(fromResponse("Login failed", 500));
                }
              }
            );
          }
        } else {
          reject(fromResponse("Wrong email/password", 400));
        }
      });
    });
  },

  register: (request) => {
    
  },

  checkUser: (request) => {
    
  },

  changeResquest: (request) => {
    
  },

  changePassword: (request) => {
  }
};

module.exports = authModel;
