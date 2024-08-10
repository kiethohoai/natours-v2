const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourControllers');

// Check ID Middleware before go to Routes
// router.param('id', tourController.checkID);

router
  .route('top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTour);

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
