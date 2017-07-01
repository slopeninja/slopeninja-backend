import cheerio from 'cheerio';
import { AllHtmlEntities } from 'html-entities';

const htmlEntities = new AllHtmlEntities();

/* preparsers */

export const removeBackSlashes = (text) => {
  const decoded = text ? text.toString().replace(/\\/g, '') : null;
  return decoded;
}

export const decodeEntities = (text) => {
  // best way I found to normalize unicode in input
  const unicodeInput = JSON.stringify(JSON.parse(text.toString()));
  return htmlEntities.decode(unicodeInput);
}

/* parsers */

export const createHtmlParser = (key, parser, preParser = t => t) => async (htmlText) => {
  const $ = cheerio.load(preParser(htmlText), { decodeEntities: true });

  const keyData = await parser($);

  return {
    [key]: keyData,
  };
}

export const createJSONParser = (key, parser, preParser = t => t) => async (data = '{}') => {
  let json = JSON.parse(preParser(data));

  let d;
  if (json) {
    d = json;
  }

  const keyData = await parser(d);

  return {
    [key]: keyData,
  };
}

export const createTextParser = (key, parser, preParser = t => t) => async (data = '') => {
  let text = preParser(data.toString());

  const keyData = await parser(text);

  return {
    [key]: keyData,
  };
}
