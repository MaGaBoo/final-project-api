const Plant = require('../models/Plant.Model.js');

module.exports.create = (req, res, next) => {
  const plant = { commonName, scientificName, description, height, image, category, price, plantCare, temperature, light, watering, difficulty, petFriendly } = req.body

    Plant.create(plant)
      .then(plant => res.status(200).json(plant))
      .catch(next)
}

module.exports.detail = (req, res, next) => {
  Plant.findById(req.params.id)
    .then(plant => res.status(200).json(plant))
    .catch(next)
}

module.exports.update = (req, res, next) => {
  Plant.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(plant => res.status(200).json(plant))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  Plant.findByIdAndRemove(req.params.id)
    .then(plant => res.status(200).json(plant))
    .catch(next)
}