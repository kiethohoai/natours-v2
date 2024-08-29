const Tour = require('../model/tourModel');

exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

// todo CREATE TOUR
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Update a tour...>',
    },
  });
};
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};
