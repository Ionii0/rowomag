const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: {type: String, required: true},
        quantity: {type: Number, required: true}
    }],
    price: {type: Number, required: true},
    orderedAt: Date,
    isDelivered: {type: Boolean, required: true, default: false},
    username: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},

}, {
    timestamps: true
});
const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;
