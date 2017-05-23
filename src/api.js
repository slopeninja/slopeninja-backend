import Koa from 'koa';
import koaCors from 'kcors';
import KoaRouter from 'koa-router';
import koaBodyParser from 'koa-bodyparser';

import Joi from 'joi';

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

  let resort;

  try {
    resort = await resortService.findById(resortId);
  } catch(error){
    // network or db error
    ctx.status = 500;
    return;
  }

  if(!resort) {
    // cannot find resort
    ctx.status = 404;
    return;
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

router.post('/subscribers', (ctx) => {
  // FIXME refactor this into util
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required()
  });

  const { error, value } = Joi.validate({
    email: ctx.request.body.email,
  }, schema);

  if(error) {
    ctx.status = 400;
    ctx.body = {
      error: error.message,
    };
    return;
  }

  ctx.body = {
    email: ctx.request.body.email,
  };
});

koaApp.use(koaCors());
koaApp.use(koaBodyParser());
koaApp.use(router.routes());

export default koaApp;
