const { body, validationResult } = require('express-validator');

// Validation rules for health camp
const validateHealthCamp = [
  body('name')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Camp name must be at least 5 characters long'),
  body('date')
    .isISO8601()
    .withMessage('Date must be a valid date')
    .custom(value => {
      if (new Date(value) < new Date()) {
        throw new Error('Date must be in the future');
      }
      return true;
    }),
  body('time')
    .trim()
    .notEmpty()
    .withMessage('Time is required'),
  body('location')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Location must be at least 5 characters long'),
  body('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive integer'),
  body('services')
    .isArray({ min: 1 })
    .withMessage('At least one service is required'),
  body('services.*.name')
    .trim()
    .notEmpty()
    .withMessage('Service name cannot be empty')
];

// Check for validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateHealthCamp,
  handleValidationErrors
};