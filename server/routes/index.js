var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/app', function(req, res, next) {
// 	res.sendFile(path.join(__dirname, '../public', 'app.html'));
// });

router.get(['/app', '/app/*'], function(req, res, next) {
	res.sendFile(path.join(__dirname, '../public', 'app.html'));
});

module.exports = router;
