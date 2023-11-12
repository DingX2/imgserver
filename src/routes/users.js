const express = require('express');
const router = express.Router();
const User = require('../models/User');

const multer = require('multer');
const upload = multer({
    dest: 'uploads/',
});

module.exports = router;
