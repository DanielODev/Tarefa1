const express = require('express');

const Account = require('../models/Account');

const router = express.Router();

router.post('/new', async (req, res) => {
    const {cpf } = req.body;
    //console.log('req.body', req.body)

    try{
        if(await Account.findOne({ cpf }))
        return res.status(400).send({ error: 'Cpf já cadastrado'})

        const account = await Account.create(req.body);

        account.password = undefined;

        return res.send({ account });
        }catch(err){
           // console.log(err)
            return res.status(400).send({ error: 'Falha no registro'});
        }
});

module.exports = app => app.use('/account', router);