'use strict';

const port = 3000;
const express = require('express'),
    layouts = require('express-ejs-layouts'),
    app = express(),
    homeController = require( './controllers/homeController' ),
    errorController = require('./controllers/errorController'),
    path = require( 'path' ),
    mongoose = require('mongoose');

console.log('pass 1');


//mongoose function
async function Run_Mongoose(){
    mongoose.connect('mongodb://localhost/project2', {family:  4});
    mongoose.set('strictQuery', false);
    const db = mongoose.connection;
    db.on('open', ()=> console.log('open successful'));

    mongoose.connection.on('open', () => {
        console.log('Successfully connected to MongoDB using Mongoose!');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Connection error:', err);
    });

}

Run_Mongoose();


app.set( 'view engine', 'ejs' );
app.use(layouts)

app.use( express.urlencoded({extended:false}));
app.use(express.json());

app.set( 'views', path.join(__dirname, 'views'));


console.log("pass 2");
app.get( '/', homeController.homePage);
console.log("pass 3");
app.get( '/contact', homeController.postSignUpForm);
app.get( '/users', homeController.showUsers);
console.log("pass 3a");
app.post( '/users/submit', homeController.addUsers);

console.log("pass 4");
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(port, ()=>{
    console.log('Server running on port: ', port);
});