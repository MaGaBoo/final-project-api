require("dotenv").config();
const mongoose = require("mongoose");
const Plant = require("../models/Plant.Model");
const User = require("../models/User.model");

const plants = require("./data/plants.json");
const defaultUsers = require("./data/defaultUsers.json")

require("../config/db.config");

mongoose.connection.once("open", () => {
    console.info(
      `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
    );

    const allPlantsId = [];
    const allUsersId = [];

    mongoose.connection.db
        .dropDatabase()
        .then(() => `${mongoose.connection.db.databaseName} successfully dropped`)
        .then(() => {
          return Plant.create(plants);
        })
        .then((plants) => {
            allPlantsId.push(...plants);
            console.log(allPlantsId.length, "plants created")
        })
        .then(() => {
            return User.create(defaultUsers)

        } )
        .catch((e) => console.log(e))
});


