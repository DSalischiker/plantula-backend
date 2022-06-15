const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlantSchema = new Schema({
  name: { type: String, required: true },
  inventory: { type: Schema.Types.ObjectId, ref: "inventory" },
  image: { type: String },
  propagable: { type: Boolean, default: false },
  growState: { type: Number, required: true },
  sunType: { type: Number, default: 0 },
  sunAmount: { type: Number, default: 0 },
  water: { type: Number, default: 0 },
  description: String,
});

const PlantModel = mongoose.model("plant", PlantSchema);

module.exports = PlantModel;