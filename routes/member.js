const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member");
const verifyToken = require('../helpers/verifyToken')

router.get("/", memberController.getAllMember);

router.patch("/", memberController.editMember);

router.post("/", memberController.addMember);

router.delete("/", memberController.deleteMember);

module.exports = router;
