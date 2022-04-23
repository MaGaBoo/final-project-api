require("dotenv").config();
require("../config/db.config");

const plants = require("./data/plants.json");

const Plant = require("../models/Plant.Model");

Plant.deleteMany()
.then(() => Plant.insertMany(plants))
.then((plantsCreated) => console.log(plantsCreated))
.catch((e) => console.log(e))
.finally(() => {
    process.exit()
})