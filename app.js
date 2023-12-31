if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
 
}
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const cors = require('cors');


mongoose.set('strictQuery', true)

mongoose.connect(process.env.database,
console.log('connected to mongodb'))

const AllowedOrigins = [
  process.env.allowedOrigins
];

var indexRouter = require('./routes/index');
var sportsRouter = require('./routes/sport');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// app.use((req, res, next)=>{
//   res.header('Access-Control-Allow-Origin', "*"),
//   res.header('Access-Control-Allow-Methods', '*'),
//   res.header('Access-Control-Allow-Headers', '*'),
//   res.header('Access-Control-Allow-Credentials', true),
// next()
// }
// )

// app.use(cors({
//   origin: (origin, callback) => {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//           callback(null, true)
//       } else {
//           callback(new Error('Not allowed by CORS'));
//       }
//   },
//   optionsSuccessStatus: 200
// }));

app.use(cors(
  {
    origin: AllowedOrigins[0],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200
  }))


app.use('/', indexRouter);
app.use("/sport", sportsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
