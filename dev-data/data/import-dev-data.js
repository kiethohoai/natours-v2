const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require('../../models/tourModel');

// Config mongoose to express
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connect to DB successfuly!`));

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA TO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('🚀DATA SUCCESSFULY LOADED!');
  } catch (error) {
    console.log('🚀CHECK  error =', error);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTIONS DATABASE
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('🚀DATA SUCCESSFULY DELETED!');
  } catch (error) {
    console.log('🚀CHECK  error =', error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);
