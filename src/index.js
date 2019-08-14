const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.port || 3000;

//importar o Controller
require('./controllers/accountController')(app);
require('./controllers/authController')(app);


app.listen(port, (err) => {
    if (err) {
        console.log('O servidor não está conectado');
   }else{
       console.log('O servidor está rodando na porta: ',port);
   }
});