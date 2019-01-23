const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('mobile');
});

router.get('/alcatel', (req, res, next) => {
  res.render('alcatel');
});

router.get('/liquid', (req, res, next) => {
  res.render('liquid');
});

module.exports = router;