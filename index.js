'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

var cors= require('cors')
app.use(cors())
app.options('*', cors());

var persona_routes = require('./routes/personaRoute');
var libro_routes = require('./routes/libroRoute');
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.get('/hola',(req,res)=>{

    res.status(200).send({mensaje:"Bienvenido"})
})

app.get('/api/persona/:rut',(req,res)=>{

    let rut = req.params.rut 
   res.status(200).send(`El rut es:${rut}`);   
})

//app.post('/api/persona',persona_routes);


app.use('/api', persona_routes);
app.use('/api', libro_routes);

mongoose.connect('mongodb+srv://admin:admin@universidad-lkndu.gcp.mongodb.net/UBB?retryWrites=true&w=majority', (err, res) =>{
    app.listen(5000,()=>{
        console.log("Funcionando en puerto 5000") })
})  