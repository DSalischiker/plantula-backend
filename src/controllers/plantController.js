const createError = require("http-errors");
var PlantModel = require("../models/plant");
var InventoryModel = require("../models/inventory");

const limit = 20;

/* exports.plants_find_paged = function (req, res, next) {
  const inventoryId = req.query.inventoryId;
  const page = req.query.page || 0;
  const options = inventoryId
    ? {
        inventory: inventoryId,
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
}; */

exports.findOne = function (req, res, next) {
  console.log(req.params.id);
  // return res.json({});
  PlantModel.findById(req.params.id).exec(function (err, plant) {
    if (err) {
      return next(err);
    }
    return res.json({ data: plant });
  });
}

exports.create = async function (req, res, next) {
  try{
    const inventory = await InventoryModel.findOne({ user: req.user._id });
    const plant = await PlantModel.create({
      user: req.user._id,
      inventory: inventory._id,
      name: req.body.name,
      image: req.body.image,
      propagable: req.body.propagable || false,
      growState: req.body.growState,
      sunType: req.body.sunType || 0,
      sunAmount: req.body.sunAmount || 0,
      water: req.body.water || 0,
      description: req.body.description,
    });

    await InventoryModel.updateOne({
      id: inventory._id
    }, {"$push": { plants: plant._id }});

    return res.json({ data: plant });
  } catch(err) {
    console.log(err);
    return next(err);
  }
}

exports.update = async function (req, res, next) {
  try{
    console.log(req.params.id, req.body);
    const plant = await PlantModel.updateOne({ _id: req.params.id }, {
      name: req.body.name,
      image: req.body.image,
      propagable: req.body.propagable,
      growState: req.body.growState,
      sunType: req.body.sunType,
      sunAmount: req.body.sunAmount,
      water: req.body.water,
      description: req.body.description,
    });
    return res.json({ data: plant });
  } catch(err) {
    console.log(err);
    return next(err);
  }
}