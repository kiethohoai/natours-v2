const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');
const { Schema } = mongoose;

console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE;

// Config mongoose to express
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connect to DB successfuly!`));

// Define a Schema
const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// Create a modal
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The forest Hiker 3',
  price: 500,
});

testTour
  .save()
  .then((doc) => {
    console.log('🚀CHECK  doc =', doc);
  })
  .catch((error) => {
    console.log(error);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
