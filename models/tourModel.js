const mongoose = require('mongoose');

// Define a Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },

  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },

  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },

  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },

  ratingsAverage: {
    type: Number,
    default: 4.5,
  },

  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },

  priceDiscount: {
    type: Number,
  },

  sumary: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    required: [true, 'A tour must have a price discount'],
    trim: true,
  },

  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image!'],
  },

  image: [String],

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },

  startDate: [Date],
});

// Create a modal
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
