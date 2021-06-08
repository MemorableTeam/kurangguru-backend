const express = require("express");
const router = express.Router();
const memberController = require("../controllers/members");
const verifyToken = require('../helpers/verifyToken')

router.get("/", memberController.getMembers);

router.patch("/", memberController.updateMember);

router.post("/", memberController.addMember);

router.delete("/", memberController.deleteMember);

module.exports = router;
