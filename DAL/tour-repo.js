const Tour = require('./../Models/tourModel');

exports.getTour = async id => {
  return await Tour.findById(id);
};

exports.createTour = async body => {
  return await Tour.create(body);
};

exports.updateTour = async (id, body, isNew, runValidators) => {
  return await Tour.findByIdAndUpdate(id, body, {
    new: isNew,
    runValidators: runValidators
  });
};

exports.deleteTour = async id => {
  return await Tour.findByIdAndDelete(id);
};

exports.getTourStats = async () => {
  return await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);
};

exports.getMonthlyPlan = async year => {
  return await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: { month: 1 }
    },
    {
      $limit: 12
    }
  ]);
};
