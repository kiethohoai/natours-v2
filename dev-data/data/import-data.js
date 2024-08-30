const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../model/tourModel');

dotenv.config({ path: './config.env' });

// Config mongoose to express
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('🚀Connect to DB successfuly!');
    console.log('🚀ENV =', process.env.NODE_ENV);
  });

//READING JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA TO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('🚀IMPORT DATA SUCCESS!');
  } catch (error) {
    console.log('🚀ERROR = ', error);
  }
  process.exit();
};

// DELETE ALL DATA FROM DATABASE
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('🚀DELETE DATA SUCCESS!');
  } catch (error) {
    console.log('🚀ERROR = ', error);
  }
  process.exit();
};

// EXCUTE
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// RUN CODE
// node dev-data/data/import-data.js --delete
// node dev-data/data/import-data.js --import
