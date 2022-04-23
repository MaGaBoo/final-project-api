const mongoose = require('mongoose');

const plantModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    commonName: {
      type: String,
      required: [true, "Required field"]
    },
    scientificName: {
      type: String
    },
    description: {
      type: String,
      required: [true, "Required field"]
    },
    height: {
      type: Number,
      required: [true, "Required field"]
    },
    image: {
      type: String,
      required: [true, "Required field"]
    },
    category: {
      type: ["Evergreen", "Orchids", "Cactus and Succulents"],
      require: true
    },
    price: {
      type: Number,
      required: [true, "Required field"]
    },
    plantCare: {
      temperature: {
        type: String,
        required: [true, "Required field"]
      },
      light: {
        type: String,
        required: [true, "Required field"]
      },
      watering: {
        type: String,
        required: [true, "Required field"]
      }
    },
    difficulty: {
      type: String,
      required: [true, "Required field"]
    },
    petFriendly: {
      type: Boolean,
      required: [true, "Required field"]
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v
        return ret
      }
    }
  }
)

const Plant = mongoose.model('Plant', plantModel);
module.exports = Plant;