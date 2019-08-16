const mongoose = require('../database');

const transactionSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    type: {
        type: String,
        required: true,
        lowercase: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
   
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;