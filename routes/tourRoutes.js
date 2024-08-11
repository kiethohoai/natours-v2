const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourControllers');

// Check ID Middleware before go to Routes
// router.param('id', tourController.checkID);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTour);

router
  .route('/monthly-plan/:year')
  .get(tourController.aliasTopTours, tourController.getMonthlyPlant);

router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
