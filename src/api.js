import fetch from 'isomorphic-fetch';
import Koa from 'koa';
import koaCors from 'kcors';
import KoaRouter from 'koa-router';
import koaBodyParser from 'koa-bodyparser';
import koaAlexa from 'koa-alexa';
import koaMount from 'koa-mount';
import statuses from 'statuses';

import Joi from 'joi';

import ResortService from './services/ResortService';
import UserDeviceService from './services/UserDeviceService';
import NewsletterService from './services/NewsletterService';
import AlexaService from './services/AlexaService/AlexaService';

const { MAILCHIMP_PRIVATE_KEY } = process.env;

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

router.get('/resorts/:shortName', async (ctx) => {
  const { shortName } = ctx.params;

  const resortService = new ResortService();

  let resort;

  try {
    resort = await resortService.findByShortName(shortName);
  } catch (error) {
    // network or db error
    ctx.status = statuses('Internal Server Error');
    return;
  }

  if (!resort) {
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
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  });

  const { error } = Joi.validate({
    email: ctx.request.body.email,
  }, schema);

  if (error) {
    ctx.status = statuses('Bad Request');
    ctx.body = {
      error: error.message,
    };
    return;
  }

  // Forward the post reqest to MailChimp api
  const token = Buffer.from(`anystring:${MAILCHIMP_PRIVATE_KEY}`).toString('base64');

  const mailchimpResponse = await fetch('https://us15.api.mailchimp.com/3.0/lists/b56b3d32c5/members', {
    method: 'POST',
    headers:
    new Headers({
      authorization: `Basic ${token}`,
      'content-type': 'application/json',
    }),
    body: JSON.stringify({
      email_address: ctx.request.body.email,
      status: 'subscribed',
    }),
  });

  const mailchimpResponseBody = await mailchimpResponse.json();

  if (mailchimpResponse.status !== statuses('OK')) {
    if (mailchimpResponse.status === statuses('Bad Request')) {
      ctx.status = statuses('Bad Request');
      ctx.body = {
        error: mailchimpResponseBody.title,
      };
    } else {
      ctx.status = statuses('Internal Server Error');
      ctx.body = {
        error: 'Opps. Something\'s not right.',
      };
    }

    return;
  }

  ctx.status = statuses('OK');
  ctx.body = {
    email: ctx.request.body.email,
  };
});

router.post('/user-devices', async (ctx) => {
  const schema = Joi.object().keys({
    deviceName: Joi.string(),
    notificationToken: Joi.string().required(),
  });

  const { error } = Joi.validate({
    deviceName: ctx.request.body.deviceName,
    notificationToken: ctx.request.body.notificationToken,
  }, schema);

  if (error) {
    ctx.status = statuses('Bad Request');
    ctx.body = {
      error: error.message,
    };
    return;
  }

  const userDeviceService = new UserDeviceService();

  try {
    await userDeviceService.create(ctx.request.body.deviceName, ctx.request.body.notificationToken);
  } catch (e) {
    ctx.status = statuses('Internal Server Error');
    ctx.body = {
      error: 'Opps. Something\'s not right.',
    };
    return;
  }

  ctx.status = statuses('OK');
  ctx.body = {
    deviceName: ctx.request.body.deviceName,
    notificationToken: 'valid',
  };
});

router.get('/newsletters/latest', async (ctx) => {
  const newsletterService = new NewsletterService();
  const newsletterSample = await newsletterService.getNewsletterSample();
  ctx.status = statuses('OK');
  ctx.body = newsletterSample;
});

koaApp.use(koaCors());
koaApp.use(koaBodyParser());
koaApp.use(koaMount('/alexa', async (ctx) => {
  const resortService = new ResortService();
  const resorts = await resortService.getResorts();
  const alexaService = new AlexaService(resorts);
  const skill = alexaService.getSkill();

  return koaAlexa({
    skill,
    validate: true,
  })(ctx);
}));
koaApp.use(router.routes());

export default koaApp;
