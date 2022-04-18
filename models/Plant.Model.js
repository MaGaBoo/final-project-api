const mongoose = require('mongoose');

const plantModel = new mongoose.Schema(
  {
    commonName: {
      type: String,
      require: true
    },
    scientificName: {
      type: String
    },
    description: {
      type: String,
      require: true
    },
    height: {
      type: Number,
      require: true
    },
    image: {
      type: String,
      require: true
    },
    category: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    plantCare: {
      temperature: {
        type: String,
        require: true
      },
      light: {
        type: String,
        require: true
      },
      watering: {
        type: String,
        require: true
      }
    },
    difficulty: {
      type: String,
      require: true
    },
    petFriendly: {
      type: Boolean,
      require: true
    }
  }
)

const Plant = mongoose.model('Plant', plantModel);
module.exports = Plant;