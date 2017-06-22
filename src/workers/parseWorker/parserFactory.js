import cheerio from 'cheerio';
import { AllHtmlEntities } from 'html-entities';

const htmlEntities = new AllHtmlEntities();

export const removeBackSlashes = (text) => {
  const decoded = text ? text.toString().replace(/\\/g, '') : null;
  return decoded;
}

export const xyz = (text) => {
  const decoded = text ? text.toString().replace(/\u0026amp;/gu, '__JAKE__') : null;
  return decoded;
}

export const decodeEntities = (text) => {
  // best way I found to normalize unicode in input
  const unicodeInput = JSON.stringify(JSON.parse(text.toString()));
  return htmlEntities.decode(unicodeInput);
}

export const createHtmlParser = (key, parser, preParser = t => t) => async (html) => {
  const $ = cheerio.load(preParser(html), { decodeEntities: true });

  const keyData = await parser($);

  return {
    [key]: keyData
  };
}

export const createJSONParser = (key, parser, preParser = t => t) => async (data = "{}") => {
  let json = JSON.parse(preParser(data));

  let d;
  if (json) {
    d = json;
  }

  const keyData = await parser(d);

  return {
    [key]: keyData
  };
}
