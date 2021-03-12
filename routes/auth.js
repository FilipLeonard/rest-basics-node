const express = require('express');

const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');
const router = express.Router();

router.put('/signup', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((email, { req }) => {
      return User.findOne({ email }).then(userDoc => {
        if (userDoc) return Promise.reject('Email address already exists!');
      });
    })
    .normalizeEmail(),
  body('name').trim().not().isEmpty(),
  body('password').trim().isLength({ min: 5 }),
  authController.signup,
]);

router.post('/login', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail()
    .custom((email, { req }) => {
      return User.findOne({ email }).then(userDoc => {
        console.log(email);
        console.log(userDoc);
        if (!userDoc) return Promise.reject('Email address not registered!');
      });
    }),
  authController.login,
]);

module.exports = router;
