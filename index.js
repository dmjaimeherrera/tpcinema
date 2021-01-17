const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const fileUpload = require('express-fileupload');

// DB
db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cinema'
})

// Server
var server = {
  port: 3001 //4040
};

// JWT
const jwtSecret = 'TPCinema2021';

// Routers
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const roomsRouter = require('./routes/rooms');
const reservationsRouter = require('./routes/reservations');

// Modules
app.use(session({
  secret: 'TPCinema2021',
  resave: true,
  saveUninitialized: true
}));
app.use(cors())
app.use(bodyParser.json());
app.use(fileUpload());

// use router
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/rooms', roomsRouter);
app.use('/reservations', reservationsRouter);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// JWT Router
app.post('/jwt', (req, res) => {
  const document = req.body.document;
  const token = jsonwebtoken.sign({ document: document }, jwtSecret);
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});
app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));

// starting the server
app.listen(server.port, () => console.log(`Server started, listening port: ${server.port}`));