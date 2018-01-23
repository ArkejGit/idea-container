const express = require( 'express' );
const router = express.Router(); // eslint-disable-line new-cap
const mongoose = require( 'mongoose' ); // eslint-disable-line no-unused-vars

// User login route
router.get( '/login', ( req, res ) => {
	res.render( 'users/login' );
} );

// User register route
router.get( '/register', ( req, res ) => {
	res.render( 'users/register' );
} );

// Register form POST
router.post( '/register', ( req, res ) => {
	let errors = [];

	if ( req.body.password !== req.body.password2 ) {
		errors.push( { 'text': 'Passwords do not match' } );
	}

	if ( req.body.password.length < 4 ) {
		errors.push( { 'text': 'Passwords must be at least 4 characters' } );
	}

	if ( errors.length > 0 ) {
		res.render( 'users/register', {
			'errors': errors,
			'name': req.body.name,
			'email': req.body.email,
			'password': req.body.password,
			'password2': req.body.password2
		} );
	} else {
		res.send( 'passes' );
	}
} );

module.exports = router;
