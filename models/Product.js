import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  discountPrice: {
    type: Number
  },

  img: {
    type: String
  }

}, { timestamps: true });

export default mongoose.models.Product ||
mongoose.model("Product", ProductSchema);