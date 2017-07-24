var express = require('express');
var router = express.Router();
var bwlapi = require('./bwlapi');

/* ----------------------------------
   showing some info during routing
   ---------------------------------- */
var loginfo = function (req, res, next) {
  var method = req.method;
  console.log('INFO('+method+') ------------------------------');
  console.log('INFO('+method+') host: '+req.hostname+' url: '+req.originalUrl+' base-url: '+req.baseUrl);
  console.log('INFO('+method+') params: '+JSON.stringify(req.params)); // parameters from route such as /test/<id>
  console.log('INFO('+method+') query: '+JSON.stringify(req.query)); // string parameters such as ?id=123
  console.log('INFO('+method+') body: '+JSON.stringify(req.body)); // post arguments
  next();
}
router.use(loginfo);

/* ==================================
   Pages
   ================================== */
router.get('/', function(req, res, next) {
	res.redirect('/welcome');
});

router.get('/welcome', function(req, res, next) {
	res.send('Hello');
});

router.get('/login', function(req, res, next) {
	bwlapi.callAPI(req, res, function (req, res, resData) {
		console.log("BWL response received for auth request");
		var dataJson = JSON.parse(resData.data);    // buffer to json
		//var dataText = JSON.stringify(dataJson);    // json to text
		//res.send('Data from BlueworksLive request (status='+resData.status+')<br>'+dataText);
		res.render('accountinfo', {
			title: 'BWL Account Information',
			status: resData.status,
			dat: dataJson
		});
	});
});

module.exports = router;
