var express = require('express');
var app = express();

// Mongoose API
var avatarAPI = require('./app/routes/avatarRoute');
var mapAPI = require('./app/routes/mapRoute');

// Body Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);


// CORS
var corsMiddleware = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); //replace localhost with actual host
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, PUT, PATCH, POST, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, X-Requested-With, Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else next();
};
app.use(corsMiddleware);

require('dotenv').config();

// Set up mongoose connection
var mongoose = require('mongoose');
const connectMongo = async () => {
const mongoURI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}`;
try {
  console.log("connecting.....", process.env.MONGO_DB_NAME)
  await mongoose.connect(mongoURI, 
    { useNewUrlParser: true,
    dbName: process.env.MONGO_DB_NAME});
//   mongoose.Promise = global.Promise;
//   var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log("ok")
} 

catch (error) {
  // handleError(error);
  console.log(error)
}
}

connectMongo()

// Upload middleware: multer
// temp is to store user uplaod files & images--without validation
// app.use: 1st arg: virtual path, 2nd: actual path(just state the folder name), without slash; root
app.use('/temp', express.static('temp'));
app.use('/avatars', express.static('avatars'));
app.use('/maps', express.static('maps'));

// // routes
app.use('/avatar', avatarAPI);
app.use('/map', mapAPI);

// Welcome msg on browser
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to NFT Minting API.' });
});

// Testing msg
app.listen(process.env.PORT, () => {
  console.log('Server is up and running on port number ' + process.env.PORT);
});
