const { RTMClient } = require('@slack/rtm-api');
const fs = require('fs');

let token;
const testChannel = 'C04ADSJUK5K';
const testUID = 'U04BHGBRNE6';

try {
  token = fs.readFileSync('./token').toString('utf-8');
} catch (err) {
  console.error(err);
}

console.log(token);

const rtm = new RTMClient(token);
rtm.start();

const greeting = require('./greeting');
const square = require('./square');
const office = require('./office');
const haksa = require('./haksa');
const menu = require('./menu');
const menus = require('./menus');

let offices = false;
let haksaQ = false;

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (message.channel === testChannel) { // 테스트 채널에선 testbot의 말만 들어라.
    if (message.user === testUID) {
      if (!isNaN(text)) {
        square(rtm, text, channel);
      } else if (haksaQ) {
        haksa(rtm, text, channel, haksaQ);
        haksaQ = !haksaQ;
      } else if (offices) {
        office(rtm, text, channel, offices);
        offices = !offices;
      } else {
        switch (text) {
          case 'hi':
            for (i = 0; i < 10; i++) {
              greeting(rtm, channel);
            }
            break;
          case '학사일정':
            haksa(rtm, text, channel, haksaQ);
            haksaQ = !haksaQ;
            break;
          case '학과 사무실': case '학과사무실': case '과사':
            office(rtm, text, channel, offices);
            offices = !offices;
            break;
          case '오늘 밥 뭐야' : case '오늘 뭐나와': case '오늘 밥뭐야': case '오늘밥뭐야':
            menu(rtm, channel);
            break;
            case '이번주 뭐나와' : case '이번주 뭐 나와' : case '이번주 밥뭐야' : case '이번주밥뭐야' :
            menus(rtm, channel);
            break;
          case '테스트 채널에서 떠들지 마세요.':
            break;
          default:
            rtm.sendMessage('I am alive', channel);
        }
      }
    }
  } else if (haksaQ) {
    haksa(rtm, text, channel, haksaQ);
    haksaQ = !haksaQ;
  } else if (offices) {
    office(rtm, text, channel, offices);
    offices = !offices;
  } else if (!isNaN(text)) { // 테스트 채널이 아닌경우 작동방법.
    square(rtm, text, channel);
  } else {
    switch (text) {
      case 'hi':
        greeting(rtm, channel);
        break;
      case '학사일정':
        haksa(rtm, text, channel, haksaQ);
        haksaQ = !haksaQ;
        break;
      case '학과 사무실': case '학과사무실': case '과사':
        office(rtm, text, channel, offices);
        offices = !offices;
        break;
      case '오늘 밥 뭐야' : case '오늘 뭐나와': case '오늘 밥뭐야': case '오늘밥뭐야':
        menu(rtm, channel);
        break;
      case '이번주 뭐나와' : case '이번주 뭐 나와' : case '이번주 밥뭐야' : case '이번주밥뭐야' :
        menus(rtm, channel);
        break;
      default:
        rtm.sendMessage('I am alive', channel);
    }
  }
});
