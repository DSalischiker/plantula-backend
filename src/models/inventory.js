const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  plants: [{ type: Schema.Types.ObjectId, ref: "plant" }],
  description: String,
  location: String,
});

const InventoryModel = mongoose.model("inventory", InventorySchema);

module.exports = InventoryModel;