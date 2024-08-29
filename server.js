const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE;

// Config mongoose to express
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('🚀Connect to DB successfuly!');
    console.log('🚀ENV =', process.env.NODE_ENV);
  });

// Create model
const tourSchema = new mongoose.Schema({
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

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Test Tour 3',
  price: 500,
});

testTour
  .save()
  .then(data => {
    console.log('🚀CHECK  data =', data);
  })
  .catch(err => {
    console.log('🚀CHECK  err =', err.message);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
