'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import koaBodyParser from 'koa-bodyparser';
// app.use(koaBodyParser());
const PORT = 1234;

const app = new _koa2.default();
const router = new _koaRouter2.default();

const db = {
  resorts: [{
    resortId: 123,
    name: 'Sierra'
  }]
};

const getResorts = () => {
  const promise = new Promise((resolve, reject) => {
    // go fetch info from database
    // when you come back,
    // either resolve or reject
    setTimeout(() => resolve(db.resorts), 4000);
  });

  return promise;
};

router.get('/resorts', async ctx => {
  const promise = getResorts();
  const resorts = await promise;
  ctx.body = resorts;
});

router.put('/resorts', async ctx => {
  const promise = getResorts();
  const resorts = await promise;
  ctx.body = resorts;
});

app.use(router.routes());

app.listen(PORT, () => {
  console.info(`Listening to http://localhost:${PORT}`);
});