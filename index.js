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

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;
  if (message.channel === testChannel) { // 테스트 채널에선 testbot의 말만 들어라.
    if (message.user === testUID) {
      if (!isNaN(text)) {
        square(rtm, text, channel);
      } else {
        switch (text) {
          case 'hi':
            for (i = 0; i < 100; i++) {
              greeting(rtm, channel);
            }
            break;
          case '테스트 채널에서 떠들지 마세요.':
            break;
          default:
            rtm.sendMessage('I am alive', channel);
        }
      }
    }
  } else if (!isNaN(text)) { // 테스트 채널이 아닌경우 작동방법.
    square(rtm, text, channel);
  } else {
    switch (text) {
      case 'hi':
        greeting(rtm, channel);
        break;
      case '테스트 채널에서 떠들지 마세요.':
        break;
      default:
        rtm.sendMessage('I am alive', channel);
    }
  }
});
