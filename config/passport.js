const LocalStrategy = require( 'passport-local' ).Strategy;
const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );

// Load user model
const User = mongoose.model( 'users' );

module.exports = function( passport ) {
	passport.use( new LocalStrategy( { 'usernameField': 'email' }, ( email, password, done ) => {
		// Match user
		User.findOne( {
			'email': email
		} ).then( user => {
			if ( !user ) {
				return done( null, false, { 'message': 'No user found' } );
			}

			// Match password
			bcrypt.compare( password, user.password, ( err, isMatch ) => {
				if ( err ) {
					throw err;
				}
				if ( isMatch ) {
					return done( null, user );
				}

				return done( null, false, { 'message': 'Incorecct password' } );
				
			} );
		} );
	} ) );

	passport.serializeUser( function( user, done ) { // eslint-disable-line prefer-arrow-callback
		done( null, user.id );
	} );

	passport.deserializeUser( function( id, done ) { // eslint-disable-line prefer-arrow-callback
		User.findById( id, function( err, user ) { // eslint-disable-line prefer-arrow-callback
			done( err, user );
		} );
	} );
};
