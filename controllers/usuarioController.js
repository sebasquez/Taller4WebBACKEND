'use strict'
const bcrypt = require('bcrypt-nodejs')
// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Usuario = require('../models/usuario.js');

function guardar(req, res) {

    // Devolvemos una respuesta en JSON

    let User = new Usuario();
    console.log(req)
    User.nombre = req.body.nombre;
    User.mail = req.body.mail;
    User.pass = req.body.pass;
   

   
        User.save((err, usuariorstore) => {

            if (err) res.status(500).send(`Error base de datos> ${err}`)
    
            res.status(200).send({ mensaje: "creado correctamente", 'usuario': usuariorstore })
    
        })
    
}


function validar(req, res) {


    var password = req.body.pass;


    Usuario.findOne({'mail': req.body.mail}, (err, user) => {
        if (err) return res.status(500).send({ mensaje: 'error al realizar la peticion' })
        if (!user) return res.status(401).send({ mensaje: 'Error usuario no existe' })


        bcrypt.compare(password, user.pass, function(error, isMatch) {
            if (error) {
                res.status(500).send(`Error al validar usuario> ${error}`)
            } else if (!isMatch) {
                res.status(401).send({ 'mensaje':'incorrecto'})
            } else {
                res.status(200).send({ 'mensaje':'correcto' })
            }
          })
    })

 


}

function todos(req, res) {
    Usuario.find({}, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
        if (!usuario) return res.status(404).send({ message: 'Error la persona no existe' })

        res.status(200).send({ usuario })
    })

}

module.exports = {
    guardar,
    todos,
    validar

};
