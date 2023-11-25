// server/models/Order.js

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: { type: Number, required: true},
        },
    ],
    totalAmount: { type: Number, required: true},
    status: { type: String, enum: ['pending', 'completed'], default: 'pending'},
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;