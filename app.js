const express = require( 'express' );
const exphbs = require( 'express-handlebars' );
const mongoose = require( 'mongoose' );

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
const Idea = mongoose.model( 'ideas' ); // eslint-disable-line no-unused-vars

// Handlebars Middleware
app.engine( 'handlebars', exphbs( {
	'defaultLayout': 'main'
} ) );
app.set( 'view engine', 'handlebars' );

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
  
const port = 5000;

app.listen( port, () => {
	console.log( `Server started on port ${port}` ); // eslint-disable-line no-console
} );
