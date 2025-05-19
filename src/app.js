const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.get("/musicians",async(request,response) => {
    const musician = await Musician.findAll();
    response.json(musician);
})
app.get("/musicians/1",async(request,response) => {
    const musician1 = await Musician.findByPk(1);
    response.json(musician1);
})
app.get("/musicians/2",async(request,response) => {
    const musician2 = await Musician.findByPk(2);
    response.json(musician2);
})
app.get("/musicians/3",async(request,response) => {
    const musician3 = await Musician.findByPk(3);
    response.json(musician3);
})
app.get("/bands",async(request,response) => {
    const band = await Band.findAll();
    response.json(band);
})
app.get("/bands/1",async(request,response) => {
    const band = await Band.findByPk(1);
    response.json(band);
})
app.get("/bands/2",async(request,response) => {
    const band = await Band.findByPk(2);
    response.json(band);
})
app.get("/bands/3",async(request,response) => {
    const band = await Band.findByPk(3);
    response.json(band);
})

module.exports = app;