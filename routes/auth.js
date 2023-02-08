const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedin, isNotLoggedin } = require('./middleware');
const db = require('../config/db.config');
const authController = require('../controller/authController')

const router = express.Router();
router.post('/join',authController.join)
router.post('/login', isNotLoggedin, authController.login)
router.get('/logout',isLoggedin,authController.logout)
router.post('/profile',isLoggedin, authController.profile)
router.post('/test',authController.test)

module.exports = router;
