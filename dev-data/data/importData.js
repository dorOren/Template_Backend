const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../Models/tourModel');

dotenv.config({ path: './config.env' });
const connectionstring = process.env.DB_CONNECTION.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);
mongoose.connect(connectionstring).then(() => {
  console.log('connection successful!');
});

// IMPORT DATA INTO DB
const importData = async tours => {
  try {
    const newTour = await Tour.create(tours);
    if (newTour !== undefined) {
      console.log('importData::importData:: success');
    }
  } catch (err) {
    console.log('importData::importData:: error:', err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('importData::deleteData:: success');
  } catch (err) {
    console.log('importData::deleteData:: error:', err);
  }
  process.exit();
};

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
console.log(process.argv);
if (process.argv[2] === '--import') {
  importData(tours);
} else if (process.argv[2] === '--delete') {
  deleteData(tours);
}
