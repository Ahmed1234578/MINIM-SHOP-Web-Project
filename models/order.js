const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    name: String,
    price: Number,
    count: Number,
    totalPrice: Number
});

const orderSchema = new Schema({
    orderItems: [orderItemSchema],
    totalPrice: Number,
    orderDate: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' }  // Reference to the User schema
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
