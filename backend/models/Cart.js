const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true}, 
    items: [
        {
            productId:{type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
            name: String,
            price: Number,
            quantity: {type: Number, required: true, min: 1 },
        },
    ],
}, {timestamps:true});

module.exports = mongoose.model("Cart", CartSchema);