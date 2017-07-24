var http = require("http"); // for the status codes

/* ---------------------------------------------------
   These helpers are used in handlebar files (.hbs).
   --------------------------------------------------- */
var helpers = {
	count: function(number) {
		var string = "1";
		for (var i = 2; i<=number; i++) string += " "+i;
		return string;
	},
	/* ===========================================================
	   Conversion helpers:
	   'decodeURI' 
	   'encodeURI' 
	   =========================================================== */
	decodeURI: function(string) {
		return decodeURI(string);
	},
	encodeURI: function(string) {
		return encodeURI(string);
	},
	/* -----------------------------------------------------------
	   add a description to http response code
	   ----------------------------------------------------------- */
	statusDesc: function(code) {
		if (code) 
			return code+" - "+http.STATUS_CODES[code];
		else
			return 'unknown';
	},
	/* -----------------------------------------------------------
	   the category for a given http response code
	   ----------------------------------------------------------- */
	statusCategory: function(code) {
		if (code >= 200 && code < 300)  
			return 'success';
		else if (code >= 300 && code < 400)  
			return 'warning';
		else
			return 'error';
	}
}

module.exports = helpers;
