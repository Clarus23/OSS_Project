const greeting = function (rtm, channel) {
  const random = Math.floor(Math.random() * 3); // random 은 0,1,2 중 하나의 값을 가지게 됨.
  console.log('인사를 시작합니다.');

  try {
    switch (random) {
      case 0:
        rtm.sendMessage('Hello!', channel);
        break;
      case 1:
        rtm.sendMessage('Hello I am chatbot!', channel);
        break;
      case 2:
        rtm.sendMessage('안녕하세요 저는 챗봇입니다!', channel);
        break;
      default:
        break;
    }

    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};

module.exports = greeting;
