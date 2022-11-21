const greeting = function (rtm, channel) {
  console.log('인사를 시작합니다.');

  try {
    rtm.sendMessage('Hello!', channel);
    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};

module.exports = greeting;
