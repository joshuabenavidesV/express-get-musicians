const express = require("express");
const { Band, Musician } = require('../../models/index');
const bandRouter = express.Router();


//Gets all
bandRouter.get("/", async (request, response) => {
  const bands = await Band.findAll({ include: Musician });
  response.json(bands);
});
// Gets by individual ID
bandRouter.get("/:id", async (request, response) => {
  const band = await Band.findByPk(request.params.id, { include: Musician });
  response.json(band);
});

// Creates
bandRouter.post("/", async (request, response) => {
  const newbands = await Band.create(request.body);
  response.status(201).json(newbands);
});
// Deletes
bandRouter.delete("/:id", async (request, response) => {
  const deleted = await Band.destroy({ where: { id: request.params.id } });
    response.json({ message: "Musician has been deleted" });
});
//Modifies, updates
bandRouter.put("/:id", async (request, response) => {
  const [updatedRows] = await Band.update(request.body, { where: { id: request.params.id } });
    const updatedBand = await Band.findByPk(request.params.id);
    response.json(updatedBand);
});

module.exports = bandRouter;