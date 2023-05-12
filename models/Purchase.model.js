const { Schema, model } = require("mongoose");

const purchaseSchema = new Schema(
  {
    shippingAddress: {
    type: String,
    required: true
    },
    purchasedProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    paymentMethod: {
    type: String,
    enum: ["Paypal", "Tarjeta", "Contrareembolso"],
    required: true
    }
  },
  {
    timestamps: true
  }
);

const Purchase = model("Purchase", purchaseSchema);

module.exports = Purchase;
