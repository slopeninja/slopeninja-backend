import Koa from 'koa';
import KoaRouter from 'koa-router';
// import koaBodyParser from 'koa-bodyparser';
// app.use(koaBodyParser());
const PORT = process.env.PORT || 1234;

const app = new Koa();
const router = new KoaRouter();

const db = {
  resorts: [
    {
      resortId: 123,
      name: 'Sierra',
    },
  ]
};

const getResorts = () => {
  const promise = new Promise((resolve, reject) => {
    // go fetch info from database
    // when you come back,
    // either resolve or reject
    setTimeout(() => resolve(db.resorts), 4000);
  });

  return promise;
}

router.get('/resorts', async (ctx) => {
  const promise = getResorts();
  const resorts = await promise;
  ctx.body = resorts;
});

router.put('/resorts', async (ctx) => {
  const promise = getResorts();
  const resorts = await promise;
  ctx.body = resorts;
});

app.use(router.routes());

app.listen(PORT, () => {
  console.info(`Listening to http://localhost:${PORT}`);
});
