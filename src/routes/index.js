const newsRouter = require('./news');
const contactRouter = require('./contact');
const fdimgRouter = require('./fdimg');
const diagnosaRouter = require('./diagnosa');
const infottRouter = require('./infott');
const infimgRouter = require('./infimg');
const infothuocRouter = require('./infothuoc');
const userRouter = require('./admin');
const benhRouter = require('./benh');
const trieuchungRouter = require('./trieuchung');
const tracuuthuocRouter = require('./tracuuthuoc');
const capnhatRouter = require('./capnhat');
const gettrieuchungRouter = require('./gettrieuchung');
function route(app){
    app.get('/', function (req, res) {
        res.render('home');
      });
      app.use('/infothuoc', infothuocRouter);
      app.use('/tracuuthuoc', tracuuthuocRouter);
      app.use('/gettrieuchung', gettrieuchungRouter);
      app.use('/capnhat', capnhatRouter);
      // app.use('/infimg/infothuoc', infothuocRouter);
      app.use('/news', newsRouter);
      app.use('/benh', benhRouter);
      app.use('/trieuchung', trieuchungRouter);
      app.use('/contact', contactRouter);
      app.use('/fdimg', fdimgRouter);
      app.use('/diagnosa', diagnosaRouter);
      app.use('/infott', infottRouter);
      app.use('/admin', userRouter);
      app.use('/infimg', infimgRouter);
      app.get('/search', function (req, res) {
        res.render('search');
      });
      //tesst
      app.get('/home', function (req, res) {
        res.render('home');
      });
}

module.exports = route;