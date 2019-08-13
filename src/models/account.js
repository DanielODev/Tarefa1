const mongoose = require('../database');

//bcrypt
const bcrypt = require('bcryptjs');

const  accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
   
});

// bcrtypt(.pre-> função do mongoose)
accountSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

next();
});

const Account = mongoose.model('account', accountSchema);

module.exports = Account;