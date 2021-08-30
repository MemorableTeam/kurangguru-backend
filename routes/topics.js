const express = require("express");
const router = express.Router();
const topicsController = require("../controllers/topics");
const {
  verifyId,
  onlyReturnRole,
  verifyFasilitator,
} = require("../helpers/verifyToken");


router.get("/", verifyId, topicsController.getTopics);
router.post("/", verifyFasilitator, topicsController.addTopics);
router.patch("/", topicsController.editTopics);
router.delete("/", verifyFasilitator, topicsController.deleteTopic)

module.exports = router;
