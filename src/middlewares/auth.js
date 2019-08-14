const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;  

  // verificar se o token foi informado
if (!authHeader)
    return res.status(401).send({ error: 'Token não informado' });
  
    //verificar se o token é formado por suas partes => Bearer fsf6tfrhdfg98bn7gdf8sdg9sdfhfgjh  
const parts = authHeader.split(' ');
if (!parts.length === 2)
    return res.status(401).send({ error: 'Token não é composto de duas partes' });

  //verificar o formato do token => Bearer fsf6tfrhdfg98bn7gdf8sdg9sdfhfgjh 
const [ scheme, token ] = parts;
//regular expression
if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token está com formato inválido' });

jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err)
     return res.status(401).send({ error: 'Token inválido' });

    req.accountId = decoded.id;
    return next();
  });    
};