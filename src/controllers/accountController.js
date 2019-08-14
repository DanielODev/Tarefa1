const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const Account = require('../models/Account');

const router = express.Router();

//função para gerar o token / necessário controller para validar
function generateToken(params = { }){
    return jwt.sign( params, authConfig.secret, {
        expiresIn: 172000,
    });
}

//rota de registro
router.post('/new', async (req, res) => {
    const {cpf } = req.body;
    //console.log('req.body', req.body)

    try{
        if(await Account.findOne({ cpf }))
        return res.status(400).send({ error: 'Cpf já cadastrado'});

        const account = await Account.create(req.body);
        // não mostrar a senha...
        account.password = undefined;

        return res.send({ 
            account,
            token: generateToken({id: account.id})
         });
        }catch(err){
           // console.log(err)
            return res.status(400).send({ error: 'Falha no registro'});
        }
});

//rota de autenticação
router.post('/authenticate', async (req, res) => {
const { cpf, password } = req.body;
  
const account = await Account.findOne({ cpf }).select('+password');

if (!account)
  return res.status(400).send({ error: 'Usuário não encontrado' });

if (!await bcrypt.compare(password, account.password))
    return res.status(400).send({ error: 'Password inválido' });

account.password = undefined;

res.send({
    account,
    token: generateToken({ id: account.id }),
});

});

module.exports = app => app.use('/account', router);