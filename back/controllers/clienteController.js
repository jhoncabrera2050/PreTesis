'use strict';

var Cliente = require('../models/cliente');
const bcrypt = require('bcrypt');
var jwt = require('../helpers/jwt')
const registro_cliente = async function(req,res){
    var data = req.body
    var clientes_arr = [];
    clientes_arr = await Cliente.find({email:data.email});
    if(clientes_arr.length == 0){
        // var reg = await Cliente.create(data);
        if (data.password) {
            try {
                const hash = await bcrypt.hash(data.password, 10); // Utiliza 10 salt rounds
                data.password = hash;
                var reg = await Cliente.create(data);
                res.status(200).send({ data: reg });
            } catch (error) {
                console.error('Error al hashear la contraseña:', error);
                res.status(500).send({ message: 'Error al crear el cliente', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No hay una contraseña', data: undefined });
        }
    }else{
        res.status(200).send({message:'el correo ya existe en la base de datos', data:undefined});
    }
}

const login_cliente = async function(req, res) {
    var data = req.body;
    var cliente_arr = [];

    cliente_arr = await Cliente.find({ email: data.email });

    if (cliente_arr.length == 0) {
      res.status(200).send({ message: 'no se encontro el correo', data: undefined });
    } else {
        let user = cliente_arr[0];
        bcrypt.compare(data.password, user.password, async function(err,check){
            if(check){
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message : 'la contraseña no coinciden', data:undefined});
            }
        });
    }
};
module.exports = {
    registro_cliente,
    login_cliente
}