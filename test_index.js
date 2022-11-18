require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const { ifError } = require('assert');
const fs = require('fs');

let status = 0;

let token;

try {
  token = fs.readFileSync('./test_token').toString('utf-8');
} catch (err) {
  console.error(err);
}

token = token.trim();
const testChannel = 'C04ADSJUK5K';
const testUID = 'U047H4V1TM0';

console.log(token);

const rtm = new RTMClient(token);
rtm.start();

rtm.on('ready', async () => {
  const rdy1 = await rtm.sendMessage('테스트를 시작한다.', testChannel);
  console.log('테스트 루틴 시작이다.');

  const rdy2 = await rtm.sendMessage('hi', testChannel);
});

rtm.on('message', (message) => {
  const { text } = message;

  console.log('받은 메세지 : ', text);

  if (message.user === testUID) {
    if (status === 0) {
      console.log('테스트 #1 시작.');
    } else if (status === 1) {
      // 1은 인사를 위한 루틴
      if (text === 'Hello!') {
        console.log('테스트 #1 성공.');
      } else {
        console.log('테스트 #1 실패.');
        process.exit(1);
      }
      rtm.sendMessage('16', testChannel);

      console.log('테스트 #2 시작.');
    } else if (status === 2) {
      if (text === '256') {
        console.log('테스트 #2 성공');
      } else {
        console.log('테스트 #2 실패');
        process.exit(2);
      }
    }
  } else {
    rtm.sendMessage('테스트 채널에서 떠들지 마세요.', testChannel);
  }

  status++;
});
