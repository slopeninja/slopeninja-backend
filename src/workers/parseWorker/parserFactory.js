import cheerio from 'cheerio';

export const removeBackSlashes = (text) => {
  const decoded = text ? text.toString().replace(/\\/g, '') : null;
  return decoded;
}

export const createHtmlParser = (key, parser, preParser = t => t) => async (html) => {
  const $ = cheerio.load(preParser(html));

  const keyData = await parser($);

  return {
    [key]: keyData
  };
}

export const createJSONParser = (key, parser) => async (data = "{}") => {
  let json = JSON.parse(data);

  let d;
  if (json) {
    d = json;
  }

  const keyData = await parser(d);

  return {
    [key]: keyData
  };
}
