const axios = require('axios');
const cheerio = require('cheerio');

const dt = new Date();

async function webScraping(url, selector) {
  const res = [];
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);

  for (const v of $(selector)) {
    res.push($(v).text().replace('\n', ''));
  }

  return res;
}

const today = dt.getDay() + 2;
const url = 'https://sobi.chonbuk.ac.kr/menu/week_menu.php';
const selector = `#contents > div.contentsArea.WeekMenu > div:nth-child(247) > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(${today}) > ul > li:nth-last-child(-n + 4)`;
let mealscore = 2;

const menu = async function (rtm, channel) {
  if (today !== 2 && today !== 8) {
    webScraping(url, selector).then((res) => {
      let str = res.join(',');
      console.log(str);
      rtm.sendMessage(str, channel);
      for (let i = 0; i < res.length; i++) {
        if (res[i].match('가지') || res[i].match('콩') || res[i].match('메추리알') || res[i].match('나물') || res[i].match('무침') || res[i].match('동태')) {
          mealscore -= 1;
        } else if (res[i].match('고기') || res[i].match('오리') || res[i].match('닭') || res[i].match('돈') || res[i].match('치킨')) {
          mealscore += 1;
        }
      }
      if (mealscore > 3) {
        mealscore = 3;
      } else if (mealscore < 1) {
        mealscore = 1;
      }
      rtm.sendMessage(`오늘의 식단 점수는 ${mealscore}점 입니다.`, channel);
    });
  } else {
    rtm.sendMessage('주말엔 진수원에서 식사를 제공하지 않습니다', channel);
  }
};

module.exports = menu;
