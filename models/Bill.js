const mongoose = require('mongoose');
const BillSchema = new mongoose.Schema(
    {
        clientID: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: {
            createdAt: 'createdDate',
            updatedAt: false,
        },
        versionKey: false,
    });

module.exports = {BillSchema: mongoose.model('Bill', BillSchema)};