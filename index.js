const express = require('express')
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const Router = require('./routes')
const { db , cronJob  } = require('./helper');

app.use(
	bodyParser.json({
		limit: '5mb'
	})
);
app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: '5mb'
	})
);
Router.initialize(app)
// cronJob();


if (process.env.NODE_ENV !== 'test') {
	db.initialize().then(() => {
		app.listen(process.env.port, () => {
			console.log(`Example app listening on port ${process.env.port}`)
		})
	}).catch((err) => {
	  console.error(err)
	  process.exit(1)
	})
  } else {
	module.exports = app
  }