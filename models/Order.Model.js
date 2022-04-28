const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [Object], //esto va a dar problemas
    },
    totalCart: {
      type: Number,
    },
    paymentType: {
      type: String,
    }
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
