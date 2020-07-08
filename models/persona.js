'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PersonaSchema = Schema(
    {
        nombre:{type:String, enum:["Jose","Juan"]},
        apellido:String,
        rut:String,
        edad:{type:Number}
    }
)
module.exports= mongoose.model('personas',PersonaSchema)