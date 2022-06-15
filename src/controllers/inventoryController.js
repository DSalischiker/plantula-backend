var InventoryModel = require("../models/inventory");

exports.findOne = function (req, res, next) {
  console.log(req.params.id);
  return res.json({});
  /* InventoryModel.find({ _id:  }, "name").exec(function (err, list) {
    if (err) {
      return next(err);
    }
    return res.json({ referrers: list });
  }); */
}