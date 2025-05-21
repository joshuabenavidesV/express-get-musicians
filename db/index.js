const express = require("express");
const  Musician = require('../../models/Musician');
const musiciansRouter = express.Router();

//Gets all
musiciansRouter.get("/", async (request, response) => {
  const musicians = await Musician.findAll();
  response.json(musicians);
});
// Gets by individual ID
musiciansRouter.get("/:id", async (request, response) => {
  const musicians = await Musician.findByPk(request.params.id);
    response.json(musicians);
  });

// Creates
musiciansRouter.post("/", async (request, response) => {
  const newMusicians = await Musician.create(request.body);
  response.status(201).json(newMusicians);
});
// Deletes
musiciansRouter.delete("/:id", async (request, response) => {
  const deleted = await Musician.destroy({ where: { id: request.params.id } });
    response.json({ message: "Musician has been deleted" });
});
//Modifies, updates
musiciansRouter.put("/:id", async (request, response) => {
  const [updatedRows] = await Musician.update(request.body, { where: { id: request.params.id } });
    const updatedMusician = await Musician.findByPk(request.params.id);
    response.json(updatedMusician);
});

module.exports= musiciansRouter;