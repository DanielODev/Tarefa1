const express = require('express');

const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

const router = express.Router();



//criação da transaction
router.post('/new', async (req, res) => {
    const { cpf, type, amount } = req.body;
    //console.log('req.body', req.body)

    try{
        const account = await Account.findOne({ cpf })
        if(!account)
        return res.status(400).send({ error: 'Conta não cadastrada'});

        if (type !== 'deposit' && type !== 'withdraw'){
            return res.status(400).send({ error: 'Operação inválida'});
        }

        if (amount <= 0){
            return res.status(400).send({ error: 'valor inválido'});
        }

        const transaction = new Transaction({ 
            type,
            amount, 
            account: account._id,
        });

        await transaction.save();

        return res.send({ 
            transaction
         });
        }catch(err){
            console.log(err)
            return res.status(400).send({ error: 'Falha no registro'});
        }
});

// retornar a lista de transactions
router.get('/list', async(req, res) =>{
    const { cpf } = req.body;

    try{
        const account = await Account.findOne({ cpf })
        if(!account)
        return res.status(400).send({ error: 'Conta não cadastrada'});

        const transactions = await Transaction.find({ account: account._id });
        let total = 0;
        transactions.map( transaction => {
            if (transaction.type === 'deposit'){
               total = total + transaction.amount 
            }else{
                total = total - transaction.amount 
            }
        })
        return res.send({ 
            account,
            total,
            transactions,
         });
    }catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Falha na consulta'});
    }
});


//rota de autenticação
router.post('/authenticate', async (req, res) => {
    const { cpf, password } = req.body;
    
    const account = await Account.findOne({ cpf }).select('+password');

    if (!account)
    return res.status(400).send({ error: 'conta não encontrada' });

    if (!await bcrypt.compare(password, account.password))
        return res.status(400).send({ error: 'Password inválido' });

    account.password = undefined;

    res.send({
        account,
        token: generateToken({ id: account.id }),
    });

});

module.exports = app => app.use('/transaction', router);