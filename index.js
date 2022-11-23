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

let offices = false;

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (offices) {
    office(rtm, text, channel, offices);
    offices = !offices;
  } else if (!isNaN(text)) {
    square(rtm, text, channel);
  } else {
    switch (text) {
      case 'hi':
        greeting(rtm, channel);
        break;
      case '학과 사무실': case '학과사무실':
        office(rtm, text, channel, offices);
        offices = !offices;
        break;
      default:
        rtm.sendMessage('I am alive', channel);
    }
  }
});
