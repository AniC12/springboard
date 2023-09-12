const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const { findMean, findMedian, findMode } = require('./calc')

app.get('/mean', function(req, res, next) {
  const nums = req.query.nums;
  
  if (!nums) {
    throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
  }

  let numbers = nums.split(',').map(Number);
  if (numbers instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "mean",
    value: findMean(numbers)
  }

  return res.send(result);
});

app.get('/median', function(req, res, next) {
  const nums = req.query.nums;
  
  if (!nums) {
    throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
  }

  let numbers = nums.split(',').map(Number);
  if (numbers instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "median",
    value: findMedian(numbers)
  }

  return res.send(result);
});

app.get('/mode', function(req, res, next) {
  const nums = req.query.nums;
  
  if (!nums) {
    throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
  }

  let numbers = nums.split(',').map(Number);
  if (numbers instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "mode",
    value: findMode(numbers)
  }

  return res.send(result);
});

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found",404);

  return next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

app.listen(3000, function () {
  console.log('App on port 3000');
});