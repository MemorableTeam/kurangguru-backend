const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth");
const verifyToken = require('../helpers/verifyToken')

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/register/email-verify", authController.verifyEmail);

router.post("/forgot-password", authController.forgotPassword);

router.post("/forgot-password/email-verify", authController.emailVerified);

router.post("/change-password", authController.changePassword)

router.get("/testing", verifyToken, authController.testing)

module.exports = router;
