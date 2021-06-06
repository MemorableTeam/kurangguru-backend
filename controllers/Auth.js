const authModel = require("../models/Auth");
const transporter = require("../helpers/sendMail")
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authController = {
  login: (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({
        message: "Request not be empty",
        statusCode: 400,
      });
      return;
    }
    authModel.login(req.body)
      .then((result) => {
        res.status(result.statusCode).send(result)
      }).catch((err) => {
        res.status(err.statusCode).send(err);
      })
  },

  verifyEmail: (req, res) => {
    const token = req.header('token');
    const { code } = req.body
    if (!token) {
      res.status(400).send({
        message: "Token not be empty",
        statusCode: 400,
      });
    } else {
      if (!code) {
        res.status(400).send({
          message: "Code Not Null",
          statusCode: 400,
        });
      }
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(400).send({
            message: "Incorrect or Expired token",
            statusCode: 400,
          });
        } else {
          console.log(decoded)
          if (decoded.code != code) {
            res.status(400).send({
              message: "Incorrect code input",
              statusCode: 400
            });
          }
          let data = decoded.request
          authModel.registerVerify(data)
            .then((result) => {
              res.status(result.statusCode).send(result)
            }).catch((err) => {
              res.status(err.statusCode).send(err);
            })
        }
      });
    }
  },

  // ini buat development
  register: async (req, res) => {
    const request = { ...req.body };
    let code = Math.floor(100000 + Math.random() * 900000);
    code = String(code);
    code = code.substring(0, 4);
    if (!req.body.acc) {
      res.status(400).send({
        message: "User must accepted aggrement",
        statusCode: 400,
      });
    }
    try {
      const result = await authModel.register(req.body);
      const token = jwt.sign({ request, code: code }, process.env.JWT_NODEMAILER_KEY, {
        expiresIn: "20m",
      })
      transporter
        .sendMail({
          from: "Kurang Guru Admin <no-reply@admin.kurangguru.com>", // sender address
          to: request.email, // list of receivers
          subject: "Account Activation PIN", // Subject line
          text: token, // plain text body
          html: `
            <h1> Input PIN verify in Web </h1>
            <h3> Pin : </h3>
            <h2>${code}</h2>
          `, // html body
        })
        .then(() => {
          console.log()
          res.status(result.statusCode).send({
            ...result,
            data: {
              ...req.body,
              token: token
            }
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: `Register error ${err}`,
            statusCode: 500,
          });
        });
    } catch (err) {
      console.log(err)
      const status = err.status || 500;
      res.status(status).send(err);
    }
  },
  /* 
     //ini buat production 
     register: async (req, res) => {
     const request = { ...req.body };
     let code = Math.floor(100000 + Math.random() * 900000);   
     code = String(code);
     code = code.substring(0,4);
     if (!req.body.acc) {
       res.status(400).send({
         message: "User must accepted aggrement",
         statusCode: 400,
       });
     }
     try {
       const result = await authModel.register(req.body);
       const token = jwt.sign({ request, code : code }, process.env.JWT_NODEMAILER_KEY, {
         expiresIn: "20m",
       })
       transporter
         .sendMail({
           from: "Trickitz Admin <no-reply@admin.tickitz.com>", // sender address
           to: request.email, // list of receivers
           subject: "Account Activation Token", // Subject line
           text: token, // plain text body
           html: `
             <h1>Input code verify in Web</h1>
             <h3>Code : </h3>
             <h2>${code}</h2>
           `, // html body
         })
         .then(() => {
           console.log()
           res.status(result.statusCode).send({
             ...result,
             data : {
               ...req.body,
               token : token
             }
           });
         })
         .catch((err) => {
           res.status(500).send({
             message: `Register error ${err}`,
             statusCode: 500,
           });
         });
     } catch (err) {
       console.log(err)
       const status = err.status || 500;
       res.status(status).send(err);
     }
   }, */

  forgotPassword: async (req, res) => {
    const email = req.body.email;
    try {
      const result = await authModel.forgotPasswordUser(email);
      const token = jwt.sign({ ...req.body }, process.env.JWT_NODEMAILER_KEY, {
        expiresIn: "20m",
      });
      transporter
        .sendMail({
          from: "Trickitz Admin <no-reply@admin.tickitz.com>", // sender address
          to: email, // list of receivers
          subject: "Confirm your email", // Subject line
          text: token, // plain text body
          html: `
            <h1>Copy the token to change your password</h1>
            <h3>${token}</h3>
          `, // html body
        })
        .then(() => {
          res.status(result.statusCode).send({
            ...result,
          });
        })
        .catch(() => {
          res.status(500).send({
            message: "Error occurs",
            statusCode: 500,
          });
        });
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  emailVerified: (req, res) => {
    // const { token } = req.body;
    // if (!token) {
    //   res.status(400).send({
    //     message: "Token not be empty",
    //     statusCode: 400,
    //   });
    // } else {
    //   jwt.verify(token, process.env.JWT_NODEMAILER_KEY, (err, decoded) => {
    //     if (err) {
    //       res.status(400).send({
    //         message: "Incorrect or Expired token",
    //         statusCode: 400,
    //       });
    //     } else {
    //       authModel.changeResquest(decoded)
    //         .then(result => {
    //           res.status(200).send({
    //             message: "Email verified",
    //             statusCode: 200,
    //             data: result,
    //           });
    //         })
    //         .catch(err => {
    //           res.status(500).send({
    //             message: "Error when verified email",
    //             statusCode: 500,
    //           })
    //         })
    //     }
    //   });
    // }
  },

  changePassword: async (req, res) => {
    if (!req.body.id || !req.body.password || !req.body.confirm) {
      res.status(400).send({
        message: 'Error when changing password',
        statusCode: 400,
      });
      return;
    } else if (req.body.password !== req.body.confirm) {
      res.status(400).send({
        message: 'Password doesn`t mate',
        statusCode: 400,
      });
      return;
    }
    const request = {
      ...req.body,
    }
    try {
      const result = await authModel.changePassword(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
};

module.exports = authController;
