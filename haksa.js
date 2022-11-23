const haksaP = require('./haksaP.json');

const haksa = function (rtm, text, channel, haksaQ) {
  if (haksaQ) {
    const textCheck = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/;
    if (textCheck.test(text)) {
      if (haksaP[text] !== undefined) {
        rtm.sendMessage(`${text} 은(는) ${haksaP[text]} 입니다`, channel);
      } else {
        rtm.sendMessage('해당 날짜에는 학사일정이 없습니다', channel);
      }
    } else {
      rtm.sendMessage('예시의 날짜형식과 동일하게 날짜를 입력해주세요', channel);
    }
  } else {
    console.log('학사일정을 안내합니다');
    rtm.sendMessage('안내 받을 날짜를 이야기해주세요 (예, 04/05) :', channel);
  }
};
module.exports = haksa;
