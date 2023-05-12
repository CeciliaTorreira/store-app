const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: String,
      required: true,
    },
    category: {
    type: String,
    enum: ["figure", "cómic", "videojuegos", "peluche", "decoración", "miscelánea"],
    required: true,
    },
    imageURL: {
    type: String,
    required: true
    }
  },
  {
    timestamps: true
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
