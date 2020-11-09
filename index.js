
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


app.get('/', async function (req, res) {
  const towns = await regFactory.townOutcome()
  res.render('index', {
    town: towns
  });
});

app.post('/', async function (req, res) {
  let registrationEntry = req.body.enterReg;

  let checkDupicate = await regFactory.duplicateReg(registrationEntry);
  var registrationNumber = await regFactory.regOutcome();

  if (checkDupicate !== 0) {
    req.flash('error', 'Registration number already exists');
  } else if (!registrationEntry) {
    req.flash('error', 'Please enter a registration number');
  } else if (registrationEntry.startsWith('CF ') || registrationEntry.startsWith('CY ') || registrationEntry.startsWith('CL ') || registrationEntry.startsWith('CA ')) {
    req.flash('info', 'Registration number added')
    await regFactory.workFlow(registrationEntry);
  } else if (!registrationEntry.startsWith('CF ') || !registrationEntry.startsWith('CY ') || !registrationEntry.startsWith('CL ') || !registrationEntry('CA ')) {
    req.flash('error', 'Please enter a valid registration number');
  }
  let towns = await regFactory.townOutcome();

  res.render('index', {
    regPlate: registrationNumber,
    town: towns
  })
})

app.get('/', async function (req, res) {
  let regFilter = req.query.filterBtn;
  // const towns = await regFactory.townOutcome();

  if (regFilter) {
    var filterButton = await regFactory.filterBtn(regFilter);
  }
  res.render('index', {
    registration: filterButton,

  })
})

app.get('/reset', async function (req, res) {
  await regFactory.resetBtn();
  res.redirect('/');
})

let PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});