const createError = require("http-errors");
var PlantModel = require("../models/plant");

const limit = 20;

exports.plants_find_paged = function (req, res, next) {
  const inventoryId = req.query.inventoryId;
  const page = req.query.page || 0;
  const options = inventoryId
    ? {
        inventory: inventoryId,
        /* tableNumber: { $nin: [null, ""] },
        voted: { $nin: [true] }, */
      }
    : {};
  PlantModel.paginate(options, {
    offset: page * limit,
    limit,
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      return next(error);
    });
};

exports.findOne = function (req, res, next) {
  console.log(req.params.id);
  // return res.json({});
  PlantModel.find({ _/* id:*/ }, "name").exec(function (err, list) {
    if (err) {
      return next(err);
    }
    return res.json({ plants: list });
  });
}