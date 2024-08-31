const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    slug: String,
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
    discount: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//todo Middleware Virtual Properties
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//todo Document Middleware (run before .save() & .create() )
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  // console.log('🚀🚀🚀 #1 this.slug=', this.slug);
  next();
});

/* DOCUMENT MIDDLEWARE
tourSchema.pre('save', function (next) {
  console.log('🚀🚀🚀 #2 Will save document...');
  next();
});

tourSchema.post('save', function (doc, next) {
  console.log('🚀🚀🚀 #3  doc=', doc);
  next();
});
 */

// todo QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

/* 
tourSchema.post(/^find/, function (docs, next) {
  console.log('🚀🚀🚀  docs=', docs);
  next();
});
 */

/* 
tourSchema.pre('find', function (next) {
  this.find({ secretTour: { $ne: false } });
  next();
});
 */

// todo Aggregation Middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
