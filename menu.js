const axios = require('axios')
const cheerio = require('cheerio')
const dt = new Date()

async function webScraping(url, selector) {
  let res = []
  let html = await axios.get(url)
  let $ = cheerio.load(html.data)

  for (let v of $(selector)) {
    res.push($(v).text())
  }

  return res;
}

let today = dt.getDay() + 2
let url = 'https://sobi.chonbuk.ac.kr/menu/week_menu.php'
let selector = '#contents > div.contentsArea.WeekMenu > div:nth-child(247) > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child('+today+') > ul > li:nth-last-child(-n + 4)'
const menu = function(rtm, channel) {
  switch (today) {
    case 3: case 4: case 5: case 6: case 7:
      webScraping(url, selector).then((res)=>{
        console.log(res)
        let str = res.join(",")
        rtm.sendMessage(str, channel)
      })
      break

    case 2: case 8:
      rtm.sendMessage('주말엔 진수원에서 식사를 제공하지 않습니다', channel)
      break
  }
}

module.exports = menu
