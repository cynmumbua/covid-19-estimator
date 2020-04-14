import express from 'express';
import bodyParser from 'body-parser';
import estimatorF from './estimatorFunction';
import estimatoRoute from './estimatorRoute';

const app = express();
const port = process.env.PORT || 6000;

app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// Configuring the database
const mongoose = require('mongoose');
const dbConfig = require('../configs/dbConfig.js');

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
})
  .then(() => {
  // console.log('Successfully connected to the database');
  }).catch((err) => err);

// define a root/default route
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.use('/api/v1/on-covid-19', estimatoRoute);
app.listen(port);

const covid19ImpactEstimator = (data) => {
  const input = data;
  // if (input.periodType === 'weeks') {
  //   input.timeToElapse *= 7;
  // }
  // if (input.periodType === 'months') {
  //   input.timeToElapse *= 30;
  // }
  return estimatorF(input);
};

export default covid19ImpactEstimator;
