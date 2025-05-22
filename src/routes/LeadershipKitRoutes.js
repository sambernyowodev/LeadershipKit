const express = require("express");
const router = express.Router();
const { leadershipKit } = require("../controllers/leadershipKitControllers");

router.post("/leadershipKit", leadershipKit);

module.exports = router;
