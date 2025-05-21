const express = require("express");
const app = express();
const { Musician, Band } = require("../models/Musician")
const { db } = require("../db/connection")

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Day 3 
const musiciansRouter = require("./Routes/musicians")
const bandsRouter = require("./Routes/bands")
app.use("/musicians", musiciansRouter);
app.use("/bands", bandsRouter);
//TODO: Create a GET /musicians route to return all musicians 
// //Day 1 
// app.get("/musicians",async(request,response) => {
//     const musician = await Musician.findAll();
//     response.json(musician);
// })
// // app.get("/musicians/1",async(request,response) => {
// //     const musician1 = await Musician.findByPk(1);
// //     response.json(musician1);
// // })
// // app.get("/musicians/2",async(request,response) => {
// //     const musician2 = await Musician.findByPk(2);
// //     response.json(musician2);
// // })
// // app.get("/musicians/3",async(request,response) => {
// //     const musician3 = await Musician.findByPk(3);
// //     response.json(musician3);
// // })
// app.get("/bands",async(request,response,next) => {
//     try{
//         const band = await Band.findAll();
//     response.json(band);
//     }
//     catch(error){
//         next(error);
//     }
// })

// // app.get("/bands/1",async(request,response) => {
// //     const band = await Band.findByPk(1);
// //     response.json(band);
// // })
// // app.get("/bands/2",async(request,response) => {
// //     const band = await Band.findByPk(2);
// //     response.json(band);
// // })
// // app.get("/bands/3",async(request,response) => {
// //     const band = await Band.findByPk(3);
// //     response.json(band);
// // })

// // Day  2 

// // using to find specific musicians
// app.get("/musicians/:id", async (request, response) => {
//   const id = request.params.id;
//   const musician = await Musician.findByPk(id);
//   if (musician) {
//     response.json(musician);
//   } else {
//     response.status(404).json({ error_message: "Musician not found" });
//   }

// });
// // Post creating a new muscians
// app.post("/musicians", async (request, response, next) => {
//     try{
//     const newmusicians = await Musician.create(request.body);
//      response.status(201).json(newmusicians);
//     } catch(error){
//         next(error);
//     }
// });

// //Update musicians
// app.put("/musicians/:id", async (request, response) => {
//   const id = request.params.id;
//   await Musician.update(request.body, { where: { id } });
//   const updatedmusicians = await Musician.findByPk(id);
//   response.json(updatedmusicians);
// });
// // Deleting a musicians
// app.delete("/musicians/:id", async (request, response) => {
//   const id = request.params.id;
//   const deleted = await Musician.destroy({ where: { id } });
//   if (deleted) {
//     response.json({ message: "Musicians deleted" });
//   } else {
//     response.status(404).send("Musicians not found");
//   }
// });

// // Find band by specific id
// app.get("/bands/:id", async (request, response) => {
//   const id = request.params.id;
//   const bands = await Band.findByPk(id);
//   if (bands) {
//     response.json(bands);
//   } else {
//     response.status(404).json({ error_message: "Band not found" });
//   }
// });

// // Post creating a new Bands
// app.post("/bands", async (request, response) => {
//      const newbands = await Band.create(request.body);
//      response.json(newbands);
// });

// //Update band
// app.put("/bands/:id", async (request, response) => {
//   const id = request.params.id;
//   await Band.update(request.body, { where: { id } });
//   const updatedbands = await Band.findByPk(id);
//   response.json(updatedbands);
// });
// // Deleting a band
// app.delete("/bands/:id", async (request, response) => {
//   const id = request.params.id;
//   const deleted = await Band.destroy({ where: { id } });
//   if (deleted) {
//     response.json({ message: "Band deleted" });
//   } else {
//     response.status(404).json({ message: "Band not found" });
//   }
// });

module.exports = app;