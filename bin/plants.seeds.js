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
    
    const allUsersId = [];

    mongoose.connection.db
        .dropDatabase()
        .then(() => `${mongoose.connection.db.databaseName} successfully dropped`)
        .then(() => {
          // Create Users
          return User.create(defaultUsers);
        })
        .then((users) => {
          allUsersId.push(...users);
          console.log(allUsersId.length, 'users created')
        })
        .then(() => {
          // Create random plant with these two IDs
    
          const listOfPlants = plants.map((plant) => {
            const randomUser = Math.floor(Math.random() * allUsersId.length);
    
            return {
              ...plant,
              user: allUsersId[randomUser]._id,
            };
          });
    
          return Plant.create(listOfPlants);
        })
        .catch((error) => console.log("mongoose", error))
        .finally(() => {
          mongoose.connection
            .close()
            .then(() => console.log("Finish seeds.js"))
            .catch((e) => console.error(e))
            .finally(() => {
              process.exit(0);
            });
        });
});


