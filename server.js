var express = require('express');
const lodash = require('lodash'); 
const evilsrc = {constructor: {prototype: {evilkey: "evilvalue"}}};
// Object.freeze(Object.prototype);
lodash.defaultsDeep({}, evilsrc)

const { getArduinoDevices } = require('./lib/arduino');

var app = express();
var password = "Ivan_jr22"

// set the view engine to ejs
app.set('view engine', 'ejs');
// static assets directory
app.use(express.static('public'));

// index page, this callback contains code that can be exploited for CVE-2022-29078 
app.get('/', function(req, res) {
  if (!req.query.hasOwnProperty('id')){
    req.query.id = 'Stranger';
    console.info(`[INFO] User: ${req.query.id}`);
  }
  res.render('pages/index',req.query);
});

app.get('/devices', async (req, res) => {
  try {
    const devices = await getArduinoDevices();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch devices' });
  }
});


app.listen(3000);
console.log('Server is listening on port 3000 \n\t http://localhost:3000/');

var session = require("express-session")
app.use(
  session({
    cookie: {
      domain: "domain.org",
      secure: true,
      httpOnly: false,
      name: "cookie",
      maxAge: 12 * 60 * 60 * 1000,
      path: "/",
    },
  })
)
