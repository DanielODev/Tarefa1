const express = require('express');

const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middlewares/auth')
var moment = require('moment');
var currencyFormatter = require('currency-formatter');

const router = express.Router();

router.use(authMiddleware);



//criação da transaction
router.post('/new', async (req, res) => {
    const { type, amount } = req.body;
    try{
        if (type !== 'deposit' && type !== 'withdraw'){
            return res.status(400).send({ error: 'Operação inválida'});
        }

        if (amount <= 0){
            return res.status(400).send({ error: 'valor inválido'});
        }

        const transaction = new Transaction({ 
            type,
            amount, 
            account: req.accountId,
        });

        await transaction.save();

        return res.send({ 
            transaction
         });
        }catch(err){
            return res.status(400).send({ error: 'Falha no registro'});
        }
});

// retornar a lista de transactions
router.get('/list', async(req, res) =>{
    try{
        const account = await Account.findOne({ _id: req.accountId })
        if(!account)
        return res.status(400).send({ error: 'Conta não cadastrada'});

        const transactions = await Transaction.find({ account: req.accountId });
        let total = 0;
        let transactionsNew = []
        transactions.map( transaction => {
            if (transaction.type === 'deposit'){
               total = total + transaction.amount 
            }else{
                total = total - transaction.amount 
            }

            createdAtFormatted = moment(transaction.createdAt).format("DD/MM/YYYY HH:mm") 
            amountFormatted = currencyFormatter.format(transaction.amount, { code: 'BRL' }) 

            const item = {
                _id: transaction._id,
                type: transaction.type,
                createdAt: createdAtFormatted,
                amount: amountFormatted
            }
            transactionsNew.push(item)
        })

        return res.send({ 
            account,
            total: currencyFormatter.format(total, { code: 'BRL' }),
            transactions: transactionsNew,
         });
    } catch (err) {
        return res.status(400).send({ error: 'Falha na consulta'});
    }
});

module.exports = app => app.use('/transaction', router);