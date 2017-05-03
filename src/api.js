import Koa from 'koa';
import koaCors from 'kcors';
import KoaRouter from 'koa-router';
import koaBodyParser from 'koa-bodyparser';

import ResortService from './services/ResortService';

const koaApp = new Koa();
const router = new KoaRouter();

router.get('/resorts', async (ctx) => {
  const resortService = new ResortService();
  const resorts = await resortService.getResorts();

  ctx.body = {
    resorts,
  };
});

router.get('/resorts/:resortId', async (ctx) => {
  const resortId = ctx.params.resortId;

  const resortService = new ResortService();
  const resort = await resortService.findById(resortId);

  if(!resort) {
    ctx.throw(404)
  }

  ctx.body = {
    resort,
  };
});

router.post('/resorts', (ctx) => {
  // echo json body
  ctx.body = {
    ...ctx.request.body,
  };
});

koaApp.use(koaCors());
koaApp.use(koaBodyParser());
koaApp.use(router.routes());

export default koaApp;
