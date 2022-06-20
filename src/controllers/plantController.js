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

/* exports.plant_statistics = async function (req, res, next) {
  if (!req.query.referrerId) return next(createError(400));
  try {
    const totals = await VoterModel.countDocuments({
      referrer: req.query.referrerId,
      tableNumber: { $nin: [null, ""] },
    });
    const totalsVoted = await VoterModel.countDocuments({
      referrer: req.query.referrerId,
      voted: true,
      tableNumber: { $nin: [null, ""] },
    });
    return res.json({ totals, totalsVoted, referrerId: req.query.referrerId });
  } catch (err) {
    return next(createError(500));
  }
}; */