var express = require('express');
var router = express.Router();

router.get('/', function(req, resp) {

  resp.render('index', {
    pageTitle: ' Home',
    pageID: 'home-page'
  });
});

module.exports = router;
