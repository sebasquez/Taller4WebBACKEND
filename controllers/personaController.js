'use strict'
 
// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Persona = require('../models/persona.js');
 
// Creamos un método en el controlador, en este caso una accion de pruebas
function guardar(req, res){
 let nuevapersona = new Persona()
 nuevapersona.nombre=req.body.nombre
 nuevapersona.apellido=req.body.apellido
 nuevapersona.rut=req.body.rut
 nuevapersona.edad=req.body.edad
 
 nuevapersona.save((err, nuevapersonastore) => {

    if(err) res.status(500).send('Error en la base de datos> ${err}')
    
    res.status(200).send({nuevapersona : nuevapersonastore}) }
)}

function buscar(req,res){
    let nombrereq=req.query.nombre
    let rutreq=req.query.rut
    console.log(rutreq);
    Persona.find({nombre: nombrereq, rut : rutreq}, (err,persona) => {
        if(!persona) return res.status(404).send({message: 'Error persona no existe'})

        res.status(200).send( {persona} )
    })
}

function buscarid(req,res){
    let idpersona= req.params.id
    Persona.findById(idpersona , (err,persona) => {
        if(err) return res.status(500).send({message: 'Error al realizar la peticion'})

        if(!persona) return res.status(404).send({message: 'Error la persona no existe'})
        
        res.status(200).send({persona})}
)}

function persona(req,res){
    try{
        let rut = req.body.rut;
        let nombre = req.body.nombre;
        let apellido = req.body.apellido;
        let direccion = req.body.direccion;
        let comuna = req.body.comuna;
        let ciudad = req.body.ciudad;
        let pais = req.body.pais;
        let fechaN = req.body.fechaN;
        
        if (rut && nombre && apellido && direccion && comuna && ciudad && pais && fechaN){
                res.status(200).send({persona:req.body});}
        else { res.status(400).send("Faltan datos");}
     }
     
         catch(error){res.status(400).send("Error");}
     
     }

// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    guardar,
    persona,
    buscar,
    buscarid
};
