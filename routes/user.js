const express = require('express');
const router = express.Router();
const admin = require('./admin');
const productcontrollers = require('../controllers/product')





router.get('/',productcontrollers.getproduct)
 

module.exports = router;