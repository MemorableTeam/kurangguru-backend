const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member");
const { verifyFasilitator, userOrFasilitator, onlyReturnRole } = require('../helpers/verifyToken')

router.get("/", onlyReturnRole, memberController.getAllMember);

router.patch("/", verifyFasilitator, memberController.editMember);

router.post("/", userOrFasilitator, memberController.addMember);

router.delete("/", verifyFasilitator, memberController.deleteMember);

module.exports = router;
