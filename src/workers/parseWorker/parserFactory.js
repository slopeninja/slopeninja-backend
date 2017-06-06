import cheerio from 'cheerio';

export const createHtmlParser = (key, parser) => async (html) => {
  const $ = cheerio.load(html)

  const keyData = await parser($);

  return {
    [key]: keyData
  };
}

export const createJSONParser = (key, parser) => async (data = "{}") => {
  let json = JSON.parse(data);

  let d;
  if (json) {
    d = json.default_data;
  }

  const keyData = await parser(d);

  return {
    [key]: keyData
  };
}
