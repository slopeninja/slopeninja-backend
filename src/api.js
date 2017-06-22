import fetch from 'isomorphic-fetch';
import Koa from 'koa';
import koaCors from 'kcors';
import KoaRouter from 'koa-router';
import koaBodyParser from 'koa-bodyparser';
import basicAuth from 'basic-auth';
import statuses from 'statuses';

import Joi from 'joi';

import ResortService from './services/ResortService';

const MAILCHIMP_PRIVATE_KEY = process.env.MAILCHIMP_PRIVATE_KEY;

const koaApp = new Koa();
const router = new KoaRouter();

router.get('/resorts', async (ctx) => {
  const resortService = new ResortService();
  const resorts = await resortService.getResorts();

  ctx.status = statuses('OK');
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
    ctx.status = statuses('Internal Server Error');
    return;
  }

  if(!resort) {
    // cannot find resort
    ctx.status = statuses('Not Found');
    return;
  }

  ctx.status = statuses('OK');
  ctx.body = {
    resort,
  };
});

router.post('/resorts', (ctx) => {
  // echo json body
  ctx.status = statuses('OK');
  ctx.body = {
    ...ctx.request.body,
  };
});

router.post('/subscribers', async (ctx) => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required()
  });

  const { error, value } = Joi.validate({
    email: ctx.request.body.email,
  }, schema);

  if(error) {
    ctx.status = statuses('Bad Request');
    ctx.body = {
      error: error.message,
    };
    return;
  }

  // Forward the post reqest to MailChimp api
  const token = new Buffer(`anystring:${MAILCHIMP_PRIVATE_KEY}`).toString('base64');

  const mailchimpResponse = await fetch(`http://us15.api.mailchimp.com/3.0/lists/b56b3d32c5/members`, {
    method: "POST",
    headers:
    new Headers({
        authorization: `Basic ${token}`,
       'content-type': 'application/json',
     }),
    body: JSON.stringify({
      email_address: ctx.request.body.email,
      status: 'subscribed'
    }),
  });

  const mailchimpResponseBody = await mailchimpResponse.json();

  if(mailchimpResponse.status !== statuses('OK')) {

    if(mailchimpResponse.status == statuses('Bad Request')) {
      ctx.status = statuses('Bad Request');
      ctx.body = {
        error: mailchimpResponseBody.title
      }
    } else {
      ctx.status = statuses('Internal Server Error');
      ctx.body = {
        error: 'Opps. Something\'s not right.'
      }
    }

    return;
  }

  ctx.status = statuses('OK');
  ctx.body = {
    email: ctx.request.body.email,
  };
});

koaApp.use(koaCors());
koaApp.use(koaBodyParser());
koaApp.use(router.routes());

export default koaApp;
