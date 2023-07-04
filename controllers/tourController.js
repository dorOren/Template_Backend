const Tour = require('./../Models/tourModel');
const tourRepo = require('./../DAL/tour-repo');
const QueryActions = require('./../utils/QueryActions');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    console.log('tourController::getAllTours called');
    // BUILD QUERY
    const queryActions = new QueryActions(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // EXECUTE QUERY
    const tours = await queryActions.query;

    res.status(200).json({
      status: 'tourController::getAllTours:: success',
      data: {
        tour: tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'tourController::getAllTours:: error',
      msg: err.message
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    console.log('tourController::getTour called');
    const tour = await tourRepo.getTour(req.params.id);

    res.status(200).json({
      status: 'tourController::getTour:: success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'tourController::getTour:: error',
      msg: err.message
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    console.log('tourController::createTour called');
    const newTour = await tourRepo.createTour(req.body);

    res.status(201).json({
      status: 'tourController::createTour:: success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'tourController::createTour:: error',
      msg: err.message
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    console.log('tourController::updateTour called');
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      true,
      true
    );

    res.status(200).json({
      status: 'tourController::updateTour:: success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'tourController::updateTour:: error',
      msg: err.message
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    console.log('tourController::deleteTour called');
    const tour = await tourRepo.deleteTour(req.params.id);

    res.status(204).json({
      status: 'tourController::deleteTour:: success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'tourController::deleteTour:: error',
      msg: err.message
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    console.log('tourController::getTourStats called');
    const stats = await tourRepo.getTourStats();

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    console.log('tourController::getMonthlyPlan called');
    const year = req.params.year * 1;
    const plan = await tourRepo.getMonthlyPlan(year);

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};
