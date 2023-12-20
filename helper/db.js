const mongoose = require("mongoose");
const { scheduleModel } = require("../api/scheduleEmail");

require("dotenv").config();

const initialize = () => {
  let uri = process.env.DB_URI;

  return mongoose
    .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
      console.info(`database connected on`);
    })
    .catch((error) => {
      console.error(`Error :${error}`);
      console.info("not able to connect with mongoDB, existing process");
      process.exit(0);
    });
};

const db = {
  initialize,
  schedule:scheduleModel,
};

global.db = db;

module.exports = db;
