const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "figura",
        "cómic",
        "videojuegos",
        "peluche",
        "decoración",
        "miscelánea",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    productImage: String,
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
