const express = require("express");
const bcrypt = require("bcrypt");
const pg = require("../helpers/connection");
const queryAuth = require("../helpers/queryAuth");
const jwt = require("jsonwebtoken");
const formResponse = require("../helpers/formResponse");

const authModel = {
  login: (request) => {
    return new Promise((resolve, reject) => {
      const { password } = request;
      const query = queryAuth.login(request);
      pg.query(query, (err, result) => {
        if (!err) {
          if (result.rows.length > 1) {
            reject(formResponse("Wrong email/password", 400));
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
                            formResponse("Login success", 200, {
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
                    reject(formResponse("Wrong email/password", 400));
                  }
                } else {
                  reject(formResponse("Login failed", 500));
                }
              }
            );
          }
        } else {
          reject(formResponse("Wrong email/password", 400));
        }
      });
    });
  },

  register: (request) => {
    return new Promise((resolve, reject)=>{
      const {username, email ,password} = request;
      pg.query(`SELECT email FROM users WHERE email = '${email}'`, (err, value)=>{
        if(!err){
          if(value.rows.length < 1){
            bcrypt.hash(password, 10, function (errHash , hash){
              if(!errHash){
                const newUser = {
                  username: username,
                  email: email,
                  password: hash,
                }
                const query = queryAuth.register(newUser)
                pg.query(query, (err)=>{
                  if(!err){
                    resolve(formResponse("Register sucsess", 201))
                  }else{
                    reject(formResponse(`Register failed ${err}`, 500))
                  }
                })
              }else{
                reject(formResponse(`Register failed ${err}`,500 ))
              }
            })
          }else{
            reject(formResponse("User exist", 400))
          }
        }
      })
    })
  },

  registerVerify: (request) => {
    return new Promise((resolve, reject)=>{
      const{ email } = request;
      pg.query(`SELECT email FROM users WHERE email = '${email}'`, (err, val)=>{
        if(!err){
          if(val.rows.length > 0){
            pg.query(`UPDATE users SET verified_at = 'NOW()' WHERE email = '${email}'`, (error, value)=>{
              if(!error){
                resolve(formResponse("Verify Success", 201))
              }else{
                reject(formResponse("Verify Failed", 400))
              }
            })
          }else{
            reject(formResponse("User not Found", 400))
          }
        }else{
          reject(formResponse("Error verify", 500))
        }
      })
    })
  },

  changeResquest: (request) => {
    
  },

  changePassword: (request) => {
    return new Promise((resolve, reject)=>{
      pg.query(`SELECT id from users WHERE id =  ${request.id}`, (err, result)=>{
        if(!err){
          if(result.rows.length < 1){
            reject(formResponse(`User doesn't exist`, 400))
            return
          }
          bcrypt.hash(request.password, 10, function(errHash, hash){
            if(!err){
              pg.query(`UPDATE users SET password= '${hash}'`, (err)=>{
                if(!err){
                  resolve(formResponse("Change password succsess bro..!!", 201))
                }else{
                  reject(formResponse("Uh.. Change password failed", 500))
                }
              })
            }else{
              reject(formResponse("Uh.. Change password failed", 500))
            }
          })
        }else{
          reject(formResponse("Uh.. Change password failed", 500))
        }
      })
    })
  }
};

module.exports = authModel;
