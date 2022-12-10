const axios = require('axios');
const cheerio = require('cheerio');

async function webScraping(url, selector) {
  const res = [];
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);

  for (const v of $(selector)) {
    res.push($(v).text().replace('\n', ''));
  }

  return res;
}

const url = 'https://sobi.chonbuk.ac.kr/menu/week_menu.php';
const days = ['월', '화', '수', '목', '금'];

const menus = async function (rtm, channel) {
  let selector = `#contents > div.contentsArea.WeekMenu > div:nth-child(253) > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(n + 3) > ul > li:nth-last-child(-n + 4)`;
  webScraping(url, selector).then((res) => {
    console.log(res);
    for (let i = 0; i < 5; i++) {
      let res2 = res.slice(i * 4, (i + 1) * 4)
      const str = `${days[i]}요일 식단 : ` + res2.join(',');
      rtm.sendMessage(str, channel);
      let mealscore = 2;
      for (let j = 0; j < res2.length; j++) {
        if (res2[j].match('가지') || res2[j].match('콩') || res2[j].match('메추리알') || res2[j].match('나물') || res2[j].match('무침') || res2[j].match('동태')) {
          mealscore -= 1;
        } else if (res2[j].match('고기') || res2[j].match('오리') || res2[j].match('닭') || res2[j].match('돈') || res2[j].match('치킨')) {
          mealscore += 1;
        }
      }
      if (mealscore > 3) {
        mealscore = 3;
      } else if (mealscore < 1) {
        mealscore = 1;
      }
      rtm.sendMessage(`${days[i]}요일의 식단 점수는 ${mealscore}점 입니다.`, channel);
    }
  });
};

module.exports = menus;