const cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');

async function scrapeWSJ(url, infoObj){
  infoObj.source = 'wsj'
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  infoObj.headline = await $('h1[class=wsj-article-headline]').text().trim();
  infoObj.imageUrl = 'http://www.thetascgroup.com/tasc-media/uploads/2016/03/wallstreetjournal-e1478184231185.jpg'
  infoObj.textLength = await $('.wsj-snippet-body').text().length
  infoObj.text = await $('.wsj-snippet-body').text().replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim();
  return infoObj;
}

module.exports = scrapeWSJ;
