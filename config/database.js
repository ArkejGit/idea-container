if ( process.env.NODE_ENV === 'production' ) {
	module.exports = {
		'mongoURI': 'mongodb://Arkej:idea123@ds219318.mlab.com:19318/idea-container'
	};
} else {
	module.exports = {
		'mongoURI': 'mongodb://localhost/idea-container'
	};
}
