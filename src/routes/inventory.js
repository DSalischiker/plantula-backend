const express = require("express");
const passport = require("passport");
const inventory_controller = require("../controllers/inventoryController");
const router = express.Router();

router.get(
  "/:id",
  // This line goes for every route
  passport.authenticate("jwt", { session: false }),
  inventory_controller.findOne
);

module.exports = router;