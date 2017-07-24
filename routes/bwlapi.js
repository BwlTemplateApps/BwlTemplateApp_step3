var https = require("https");
/* --------------------------------------
   Examples for path (GET,POST,PUT,DELETE):
   Account activity
   G--- /scr/api/activity
   User management
   G--- /api/Auth
   G--- /scr/api/UserList
   G--- /scr/api/Avatar
   G-PD /scr/api/provision/user
   G-PD /scr/api/ManageGroup
   ...
   -------------------------------------- */
function callAPI(req,res,handleResponse){
  var host = 'www.blueworkslive.com';
  var username = 'xxxx';
  var password = 'yyyy';
  var path = '/api/Auth';
  var headers = {
    'Authorization': 'Basic ' + new Buffer(username+':'+password).toString('base64'),
  };
  var options = {
    host: host,
    path: path,
    method: 'GET',
    headers: headers
  };
  var bwlResData = {};
  console.log('BwlApiCall: Request '+options.method+' https://'+options.host+options.path);
  var bwlRequest = https.request(options, function(bwlResponse) {
	console.log("BwlApiCall: Response status="+bwlResponse.statusCode);
	bwlResData.status = bwlResponse.statusCode;   // statusCode >= 200 and < 300 is OK
	bwlResData.headers = bwlResponse.headers;
	var bufferData = [];
	bwlResponse.on('data', function(data) {
	  bufferData.push(data);
      console.info('BwlApiCall: Response data received');
	});
	bwlResponse.on('end', function() {
      console.info('BwlApiCall: completed, calling callback');
	  bwlResData.data = Buffer.concat(bufferData);
	  handleResponse(req, res, bwlResData);
    });
  });
/*  if ((reqData.method == "post" || reqData.method == "put") && reqData.senddata) {
    console.log(reqData.method+' sending data: '+reqData.senddata);
    bwlRequest.write(reqData.senddata);
  } */
  bwlRequest.end();
  bwlRequest.on('error', function(e){
    console.error('BwlApiCall: REQUEST-ERROR '+e);
  });
}

exports.callAPI=callAPI;
