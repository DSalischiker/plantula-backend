const createError = require("http-errors");
var PlantModel = require("../models/plant");
var InventoryModel = require("../models/inventory");

const limit = 20;

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

exports.findPropagables = function(req, res, next) {
  PlantModel.find({ propagable: true })
    .populate('user', "email")
    .exec(function (err, plants) {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.json({ data: plants });
    }
    )
  ;
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
      _id: inventory._id
    }, {"$push": { plants: plant._id }});

    return res.json({ data: plant });
  } catch(err) {
    console.log(err);
    return next(err);
  }
}

exports.updateOne = async function (req, res, next) {
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

exports.deleteOne = async function (req, res, next) {
  try {
    const inventory = await InventoryModel.findOne({ user: req.user._id });

    await PlantModel.deleteOne({ _id: req.params.id });

    await InventoryModel.updateOne({
      id: inventory._id
    }, {"$pull": { plants: req.params.id }});

    return res.json();
  } catch(err) {
    console.log(err);
    return next(err);
  }
}