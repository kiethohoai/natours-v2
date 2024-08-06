const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// todo Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

/* app.use((req, res, next) => {
  console.log('Hello, I am from Middleware');
  next();
}); */

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// todo configRoutes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
