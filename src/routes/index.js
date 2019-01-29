const path = require('path');
const express = require('express');
const router = express.Router();

var visitCounter = 1;

router.get('/', (req, res, next) => {
  res.render('mobile');
});

router.get('/alcatel', (req, res, next) => {
  res.render('alcatel');
});

router.get('/liquid', (req, res, next) => {
  res.render('liquid');
});

router.get('/midi', (req, res, next) => {
  if(!req.session.visitCount){
    req.session.visitCount = visitCounter;
    visitCounter++;
    console.log('session: ', req.session.visitCount);
    res.render('midiController', {session: req.session.visitCount});
  }else{
    console.log('session: ', req.session.visitCount);
    res.render('midiController', {session: req.session.visitCount});
  }
});

router.get('/mobilef', (req, res, next) => {
  if(!req.session.visitCount){
    req.session.visitCount = visitCounter;
    visitCounter++;
    console.log('session: ', req.session.visitCount);
    res.render('mobilef', {session: req.session.visitCount});
  }else{
    console.log('session: ', req.session.visitCount);
    res.render('mobilef', {session: req.session.visitCount});
  }
});

module.exports = router;