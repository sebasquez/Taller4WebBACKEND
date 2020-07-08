'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const LibroSchema = Schema(
    {
        nombre:{type: String, required:true},
        autor:{type:String, requiered:true},
        año:{type:Number, required:true},
        idioma:{type:String, enum:["ingles","español","Ingles","Español"], required:true}
    }
)
module.exports= mongoose.model('libros',LibroSchema);