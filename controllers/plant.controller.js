const Plant = require('../models/Plant.Model.js');

module.exports.create = (req, res, next) => {
  const plant = { user, content } = req.body
/*   console.log(req.body) */

/*   console.log('new plant:', JSON.parse(plant)) */

  if (req.file) {
    plant.image = req.file.path
  }

    Plant.create(plant)
      .then(plant => res.status(200).json(plant))
      .catch(next)
}

module.exports.detail = (req, res, next) => {
  Plant.findById(req.params.id)
    .populate('user')
    .then(plant => res.status(200).json(plant))
    .catch(next)
}

module.exports.list = (req, res, next) => {
  Plant.find()
    .then(plants => res.status(200).json(plants))
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