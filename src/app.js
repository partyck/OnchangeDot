const path = require('path');
const morgan = require('morgan');
const http = require('http');
const express = require('express');
const session = require('express-session');

//initializations
const app = express();
const server = http.createServer(app);

//import routes
const indexRoutes = require('./routes/index');

//sockets
require('./sockets/sockets')(server);

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
   secret: 'Floss',
   resave: false,
   saveUninitialized: false
  }));

//routes
app.use('/', indexRoutes);

//starting server
server.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'));
});