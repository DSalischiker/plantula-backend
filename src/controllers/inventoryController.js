var InventoryModel = require("../models/inventory");
var plantModel = require("../models/plant");

exports.findUserInventory = function (req, res, next) {
  console.log(req.user._id);
  // return res.json({});
  InventoryModel.findOne({ user: req.user._id })
  .populate('plants')
  .exec(function (err, inventory) {
    if (err) {
      return next(err);
    }
    return res.json({ data: inventory });
  });
}