let express = require('express');
let app = express();
const pg = require('pg');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');
const RegFactory = require('./reg-factory');

const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://melissa:pg123@localhost:5432/registration';
const pool = new Pool({
  connectionString
});

const regFactory = RegFactory(pool);
const routesReg = require('./routes');
const regR = routesReg(routesReg)

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.get('/', regR.homeRoute)

app.post('/', regR.flashMsg)

app.get('/reset', regR.resetReg)

app.get('/filter', regR.filterReg)


let PORT = process.env.PORT || 3005;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});