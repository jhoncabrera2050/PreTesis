const express = require('express');
var bodyarser = require('body-parser')
const app = express();
const cliente_route = require('../routes/cliente')
const admin_route = require('../routes/admin')
const db = require('./conection');
const bodyParser = require('body-parser');

app.use(express.json());

app.listen(3000);
app.use(bodyarser.urlencoded({extended:true}));
app.use(bodyarser.json({limit: '50mb', extended:true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',(cliente_route));
app.use('/api',(admin_route));
console.log('server on port',3000)