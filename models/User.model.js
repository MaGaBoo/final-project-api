const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;
const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required field"],
    },

    password: {
      type: String,
      required: [true, "Required field"],
      minlength: [8, "Password must have at least 8 characters"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Required field"],
      trim: true,
      lowercase: true,
      match: [EMAIL_PATTERN, "Please provide a valid email"],
    },

    image: {
      type: String,
    },

    location: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        return ret
      }
    }
  }
);

userSchema.virtual('plants', {
  ref: 'Plant',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
})


userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hash => {
            this.password = hash
            next()
        })
    } else {
        next()
    };
});

userSchema.methods.checkPassword = function(passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password)
};

const User = mongoose.model('User', userSchema);

module.exports = User