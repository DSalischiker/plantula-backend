const express = require("express");
const passport = require("passport");
const plantsController = require("../controllers/plantsController");

const router = express.Router();

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  plantsController.plants_find_paged
);

/* router.get(
  "/statistics",
  passport.authenticate("jwt", { session: false }),
  referralsController.referral_statistics
); */

module.exports = router;