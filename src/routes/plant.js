const express = require("express");
const passport = require("passport");
const plantsController = require("../controllers/plantController");

const router = express.Router();

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  plantsController.findOne
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  plantsController.create
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  plantsController.update
);
/* router.get(
  "/statistics",
  passport.authenticate("jwt", { session: false }),
  referralsController.referral_statistics
); */

module.exports = router;