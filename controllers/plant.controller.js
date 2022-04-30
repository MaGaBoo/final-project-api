const Plant = require("../models/Plant.Model.js");

module.exports.create = (req, res, next) => {
  let plant = { user, content, plantCare } = req.body;

  plant.plantCare = JSON.parse(plantCare);

  if (req.file) {
    plant.image = req.file.path;
  }

  Plant.create(plant)
    .then((plant) => res.status(200).json(plant))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Plant.findById(req.params.id)
    .populate("user")
    .then((plant) => res.status(200).json(plant))
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Plant.find()
    .then((plants) => res.status(200).json(plants))
    .catch(next);
};

module.exports.filterPlants = (req, res, next) => {
  Plant.find()
  .then((result) => result.filter(plant => plant.category.includes('Evergreen'))) // Filter no filter nada, why?
  .then((filtered) => res.status(200).json(filtered))
  .catch(next)
}

module.exports.update = (req, res, next) => {
  let updatePlant = { content, plantCare } = req.body;

  if (req.file) {
    updatePlant.image = req.file.path;
  }

  Plant.findByIdAndUpdate(req.params.id, updatePlant, { new: true })
    .then((plant) => res.status(200).json(plant))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Plant.findByIdAndRemove(req.params.id)
    .then((plant) => res.status(200).json(plant))
    .catch(next);
};
