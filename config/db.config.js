const mongoose = require("mongoose");

const DB_NAME = "final-project";

const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const DB_URI = `${URI}/${DB_NAME}`;

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info(`Successfully connected to the database ${DB_URI}`))
  .catch((error) => {
    console.error(
      `Something went wrong trying to connect to database ${DB_URI}`,
      error
    );
    process.exit(0);
  });

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose successfully disconected on app termination");
    process.exit(0);
  });
});
