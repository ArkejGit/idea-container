const express = require( 'express' );
const exphbs = require( 'express-handlebars' );
const mongoose = require( 'mongoose' );
const bodyParser = require( 'body-parser' );

const app = express();

// Connect to mongoose
mongoose.connect( 'mongodb://localhost/idea-container' )
	.then( () => {
		console.log( 'MongoDB connected' ); // eslint-disable-line no-console
	} )
	.catch( err => {
		console.log( err ); // eslint-disable-line no-console
	} );

// Load Idea Model
require( './models/Idea' );
const Idea = mongoose.model( 'ideas' );

// Handlebars Middleware
app.engine( 'handlebars', exphbs( {
	'defaultLayout': 'main'
} ) );
app.set( 'view engine', 'handlebars' );

// Body parser Middleware
app.use( bodyParser.urlencoded( { 'extended': false } ) );
app.use( bodyParser.json() );

// Index Route
app.get( '/', ( req, res ) => {
	const title = 'Welcome';

	res.render( 'index', {
		'title': title
	} );
} );

// About Route
app.get( '/about', ( req, res ) => {
	res.render( 'about' );
} );

// Add Idea Form
app.get( '/ideas/add', ( req, res ) => {
	res.render( 'ideas/add' );
} );

// Edit Idea Form
app.get( '/ideas/edit/:id', ( req, res ) => {
	Idea.findOne( {
		'_id': req.params.id
	} )
		.then( idea => {
			res.render( 'ideas/edit', {
				'idea': idea
			} );
		} )
} );

// Idea Index Page
app.get( '/ideas', ( req, res ) => {
	Idea.find( {} )
		.sort( { 'date': 'desc' } )
		.then( ideas => {
			res.render( 'ideas/index', {
				'ideas': ideas
			} );
		} );
} );

// Process Form
app.post( '/ideas', ( req, res ) => {
	let errors = [];

	if ( !req.body.title ) {
		errors.push( { 'text': 'Please add a title' } );
	}
	if ( !req.body.details ) {
		errors.push( { 'text': 'Please add some details' } );
	}

	if ( errors.length > 0 ) {
		res.render( 'ideas/add', {
			'errors': errors,
			'title': req.body.title,
			'details': req.body.details
		} );
	} else {
		const newIdea = {
			'title': req.body.title,
			'details': req.body.details
		};

		new Idea( newIdea )
			.save()
			.then( idea => { // eslint-disable-line no-unused-vars
				res.redirect( '/ideas' );
			} );
	}
} );
  
const port = 5000;

app.listen( port, () => {
	console.log( `Server started on port ${port}` ); // eslint-disable-line no-console
} );
