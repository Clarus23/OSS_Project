const greeting = function (rtm, channel) {
  console.log('인사를 시작합니다.');
  rtm.sendMessage('Hello!', channel);
};

module.exports = greeting;
