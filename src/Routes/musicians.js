const express = require("express");
const { Band, Musician } = require('../../models/index');
const musiciansRouter = express.Router();
const {check, validationResult} = require("express-validator");

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
musiciansRouter.post("/",[check("name").not().isEmpty().trim(), check("instrument").not().isEmpty().trim()], async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
      return response.status(400).json({ error: errors.array() });
    } else {
  const newMusicians = await Musician.create(request.body);
  response.status(201).json(newMusicians);
    }
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