const mongoose = require('../database');
// const bcrypt = require('bcryptjs');

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

// bcrtypt(.pre-> função do mongoose)
// transactionSchema.pre('save', async function(next){
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;

// next();
// });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;