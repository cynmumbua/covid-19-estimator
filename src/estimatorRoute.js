const express = require('express');

const router = express.Router();
const estimatorFun = require('./estimatorFunction');

// Create estimated results
router.get('/', (req, res) => {
  res.json({
    status: 'API test',
    message: 'Welcome to your first API'
  });
});
router.post('/', estimatorFun.create);

router.use((req, res, next) => {
  let { path } = req;
  if ((path = '/xml')) {
    res.set('Content-Type', 'text/xml');
  }
  next();
});
router.post('/xml', estimatorFun.create);

router.use((req, res, next) => {
  let { path } = req;
  if ((path = '/json')) {
    res.set('Content-Type', 'application/json');
  }
  next();
});

router.post('/json', estimatorFun.create);

export default router;
