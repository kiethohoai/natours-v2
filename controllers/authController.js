const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  /*   const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
     expiresIn: process.env.JWT_EXPIRES_IN
   }); */
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1: Check email password exist
  if (!email || !password) {
    return next(new AppError('Incorrect Email or Password!'));
  }

  // 2: Check if user exist & password correct
  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email or Password!', 401));
  }

  // 3: If everything is OK, send Token to the Client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});
