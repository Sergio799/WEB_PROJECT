// require modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const eventRoutes = require('./routes/EventRoutes');
const mainRoutes = require('./routes/MainRoutes');
const userRoutes = require("./routes/userRoutes")


// create app
const app = express();

// config app and connecting mongoose
let port = 3000;
let host = "localhost";
let url = "mongodb+srv://nsaiprakashreddy10:harrypotter10@cluster0.fzvfrib.mongodb.net/nbadproject3?retryWrites=true&w=majority&appName=Cluster0";
app.set('view engine', 'ejs');

mongoose.connect(url)
.then(() => {
    app.listen(port, host, ()=>{
        console.log('Server is Running on the Port', port);
    })
})
.catch(err => console.log(err.message));

// mount middleware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: url}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public'));
app.use(express.static('../public/images/'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));

// set up routes
app.use('/', mainRoutes);
app.use('/events', eventRoutes);
app.use('/users', userRoutes);

// Error Handling
app.use((req, res, next) => {
    let error = new Error('The Server Cannot Locate ' + req.url);
    error.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    // console.log(err);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    // console.log(err)
    res.status(err.status)
    res.render('error', {error: err});
})
