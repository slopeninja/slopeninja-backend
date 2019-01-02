import { SkillBuilders, Skill } from 'ask-sdk-core';
import i18n from 'i18next';
import sprintf from 'i18next-sprintf-postprocessor';

import { generateLaunchSpeech, generateSnowConditionsSpeech } from './speechUtils';
import { extractFirstResolvedValue } from './alexaUtils';

const en = {
  translation: {
    SKILL_NAME: 'Slope Ninja',
    GET_FACT_MESSAGE: "Here's the current conditions: ",
    WELCOME_MESSAGE: 'Welcome to Slope Ninja!',
    HELP_MESSAGE:
      'You can say tell me snow conditions near Squaw Valley, or, you can say exit... What can I help you with?',
    HELP_REPROMPT: 'What can I help you with?',
    FALLBACK_MESSAGE:
      "Slope Ninja can't help you with that. It can help you discover snow conditions at Lake Tahoe ski resorts. What can I help you with?",
    FALLBACK_REPROMPT: 'What can I help you with?',
    ERROR_MESSAGE: 'Sorry, an error occurred.',
    STOP_MESSAGE: 'Goodbye!',
  },
};

const enUS = {
  translation: {
    SKILL_NAME: 'Slope Ninja',
  },
};

/* interceptors */
const dataInterceptor = resorts => ({
  process(handlerInput) {
    // eslint-disable-next-line no-param-reassign
    handlerInput.data = {
      resorts,
    };
  },
});

const localizationInterceptor = resources => ({
  process(handlerInput) {
    const { locale } = handlerInput.requestEnvelope.request;

    i18n.use(sprintf).init({
      lng: locale,
      resources,
    });

    // eslint-disable-next-line no-param-reassign
    handlerInput.t = (intent, ...values) => {
      return i18n.t(intent, {
        returnObjects: true,
        postProcess: 'sprintf',
        sprintf: values,
      });
    };
  },
});

/* handlers */
const launchHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const { request: { locale } } = handlerInput.requestEnvelope;
    const { resorts } = handlerInput.data;

    const speakOutput = generateLaunchSpeech({ locale, resorts });

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt()
      // .withShouldEndSession(false)
      .withSimpleCard(handlerInput.t('SKILL_NAME'), speakOutput)
      .getResponse();
  },
};

const getSnowConditionsDialogHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'GetSnowConditionsIntent' &&
      request.dialogState !== 'COMPLETED'
    );
  },
  handle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return handlerInput.responseBuilder.addDelegateDirective(request.intent).getResponse();
  },
};

const getSnowConditionsHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'GetSnowConditionsIntent' &&
      request.dialogState === 'COMPLETED'
    );
  },
  handle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    const { resorts } = handlerInput.data;
    const { slots } = request.intent;
    const { resolutions } = slots.resort;

    const value = extractFirstResolvedValue(resolutions);
    // const resort = value.name;
    const resortShortName = value.id;

    const { locale } = request;

    const speakOutput = generateSnowConditionsSpeech({ locale, resorts, resortShortName });
    // const speakOutput = handlerInput.t('GET_FACT_MESSAGE') + condition;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withSimpleCard(handlerInput.t('SKILL_NAME'), speakOutput)
      .getResponse();
  },
};

const helpHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(handlerInput.t('HELP_MESSAGE'))
      .reprompt(handlerInput.t('HELP_REPROMPT'))
      .getResponse();
  },
};

const fallbackHandler = {
  // 2018-Aug-01: AMAZON.FallbackIntent is only currently available in en-*
  // locales. This handler will not be triggered except in those locales, so it
  // can be safely deployed for any locale.
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'AMAZON.FallbackIntent'
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(handlerInput.t('FALLBACK_MESSAGE'))
      .reprompt(handlerInput.t('FALLBACK_REPROMPT'))
      .getResponse();
  },
};

const exitHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' ||
        request.intent.name === 'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(handlerInput.t('STOP_MESSAGE'))
      .getResponse();
  },
};

const sessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    // eslint-disable-next-line no-console
    console.log(`Session ended with reason: ${request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const errorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    // eslint-disable-next-line no-console
    console.log(`Error handled: ${error.message}`);
    // eslint-disable-next-line no-console
    console.log(`Error stack: ${error.stack}`);
    return handlerInput.responseBuilder
      .speak(handlerInput.t('ERROR_MESSAGE'))
      .reprompt(handlerInput.t('ERROR_MESSAGE'))
      .getResponse();
  },
};

class AlexaService {
  constructor(resorts) {
    const skillBuilder = SkillBuilders.custom();

    skillBuilder.addRequestInterceptors(
      dataInterceptor(resorts),
      localizationInterceptor({
        en,
        'en-US': enUS,
      }),
    );
    skillBuilder.addRequestHandlers(
      launchHandler,
      getSnowConditionsDialogHandler,
      getSnowConditionsHandler,
      helpHandler,
      exitHandler,
      fallbackHandler,
      sessionEndedRequestHandler,
    );
    skillBuilder.addErrorHandlers(errorHandler);

    const skillConfig = skillBuilder.getSkillConfiguration();

    this.skill = new Skill(skillConfig);
  }

  getSkill() {
    return this.skill;
  }
}

export default AlexaService;
