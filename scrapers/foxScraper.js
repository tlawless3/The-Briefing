var cheerio = require('cheerio');
const axios = require('axios');
const Promise = require('bluebird');
var cheerioAdv = require('cheerio-advanced-selectors');
cheerio = cheerioAdv.wrap(cheerio)

async function scrapeFox(url, infoObj){
  infoObj.source = 'fox'
  const article = await axios.get(url)
  const $ = await cheerio.load(article.data)
  infoObj.headline = await $('.headline').text().trim();
  $('.article-body p').each(function() {
    infoObj.text += $(this).text()
  })
  infoObj.imageUrl = $('.image-ct div img:first').attr('src')
  infoObj.text = infoObj.text.replace(/(\n)+/g, ' ').replace(/(\t)+/g, ' ').trim()
  infoObj.textLength = infoObj.text.length
  return infoObj;
}

module.exports = scrapeFox;
