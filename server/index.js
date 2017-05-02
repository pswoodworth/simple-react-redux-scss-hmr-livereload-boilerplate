require('dotenv-safe').load();

import express from 'express';
import handlebars  from 'express-handlebars';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import favicon from 'serve-favicon';
import body from 'body-parser';
import morgan from 'morgan';

// var App = require('./src/js/entry').entry;

var server = express();

server.use(express.static('public'));
server.use(morgan('tiny'));

var cookieSecret = process.env.COOKIE_SECRET;


server.use(body.urlencoded({ extended: true }));
server.use(body.json());

server.engine('hbs', handlebars({
  extname: '.hbs',
  defaultLayout: false,
  cache: false
}));
server.set('view engine', 'hbs');




require('./routes').default(server);


server.listen(3000);





