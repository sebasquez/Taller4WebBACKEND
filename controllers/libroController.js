'use strict'
 
// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Libro = require('../models/libro.js');

function mostrarlibros(req,res){
    Libro.find({},(err,libro)=> {
        if(!libro) return res.status(404).send({message: 'Error no existen libros'})
        res.status(200).send( {libro} )
    })
}
function guardarlibro(req, res){
    let nuevolibro = new Libro()
    nuevolibro.nombre = req.body.nombre
    nuevolibro.autor = req.body.autor
    nuevolibro.año = req.body.año
    nuevolibro.idioma = req.body.idioma
    
    nuevolibro.save((err, librostore) => {
   
       if(err) res.status(500).send('Error en la base de datos> ${err}')
       
       res.status(200).send({nuevolibro : librostore}) }
   )}

   function buscarbyid(req,res){
    let idlibro= req.params.id
    Libro.findById(idlibro , (err,libro) => {
        if(err) return res.status(500).send({message: 'Error al realizar la peticion'})

        if(!libro) return res.status(404).send({message: 'Error el libro no existe'})
        
        res.status(200).send({libro})}
)}

function buscarlibro(req,res){
    let añoreq=req.query.año
    let idiomareq=req.query.idioma

    Libro.find({"año":añoreq, "idioma": idiomareq}, (err,libro) => {
        if(!libro) return res.status(404).send({message: 'Error libro no existe'})

        res.status(200).send( {libro} )
    })
}

function editar(req,res){
    let idlibro= req.params.id
    var nuevosdatos = {
        nombre : req.body.nombre,
        autor : req.body.autor,
        año : req.body.año,
        idioma : req.body.idioma
    }
    Libro.findByIdAndUpdate(idlibro, nuevosdatos, (err,libro) => {
        if(err) return res.status(500).send({message: 'Error al realizar la peticion'})
        if(!libro) return res.status(404).send({message: 'Error el libro no existe'})

        res.status(200).send("Se actualizó el libro")

    })
}

function eliminar(req,res){
    let idlibro= req.params.id
    Libro.findByIdAndRemove(idlibro , (err,libro) => {
        if(err) return res.status(500).send({message: 'Error al realizar la peticion'})

        if(!libro) return res.status(404).send({message: 'Error el libro no existe'})
        
        res.status(200).send("Se eliminó el libro")})
}

module.exports = {
    mostrarlibros,
    guardarlibro,
    buscarbyid,
    buscarlibro,
    editar,
    eliminar
}