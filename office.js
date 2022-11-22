const officelist = require('./officelist.json');

//var officeN = Object.keys(officelist);

const office = function (rtm, text, channel, offices) {
  if (offices) {
    if(officelist[text] !== undefined) {
      console.log(officelist[text]);
      rtm.sendMessage(text+ ' 은(는)'+ officelist[text] +'입니다',channel);
    }
    else {
      rtm.sendMessage("제대로 입력해 주세요",channel);
    }

  } else {
    console.log('학과 사무실 안내합니다');
    rtm.sendMessage('학과이름을 입력해주세요 (예, Architectural Engineering ) :', channel);
  }
};
module.exports = office;
