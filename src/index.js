const path = require('path');
const express = require('express');
const handlebars  = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const graphDBEndpoint = require('./config/db/index');
const route = require('./routes');
const router = require('./routes/news');
const db = require('./config/db/mongoose');

//
db.connect();
// var bodyParser = require('body-parser');

// app.use(bodyParser.json());

// router.post('/diagnosa',(req,res) => {
//   var trieuchung = req.body.trieuchung;
//   console.log(trieuchung);
// })

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.engine('hbs', handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'));

//route init
route(app);


 
app.listen(8000)