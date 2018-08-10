var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('恭喜你访问了用户路由');
});

module.exports = router;
