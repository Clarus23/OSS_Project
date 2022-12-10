const levenshtein = require('js-levenshtein');

const officelist = require('./officelist.json');

const officeN = Object.keys(officelist);

const office = function (rtm, text, channel, offices) {
  try {
    let suc = 0;
    let tmp = 0;
    if (offices) {
      for (let i = 0; i < officeN.length; i++) {
        if (officeN[i].toLowerCase().replace(/ /g, '') === text.toLowerCase().replace(/ /g, '')) {
          tmp = i;
          rtm.sendMessage(`${text} 은(는) ${officelist[officeN[i]]}에 위치합니다.`, channel);
          suc = 1;
        }
      }
      if (suc !== 1) {
        const distance = [];
        let min = 0;

        for (let i = 0; i < officeN.length; i++) {
          distance[i] = levenshtein(officeN[i].toLowerCase().replace(/ /g, ''), text.toLowerCase().replace(/ /g, ''));
          if (distance[min] > distance[i]) min = i;
        }
        rtm.sendMessage(`${officeN[min]} 은(는) ${officelist[officeN[min]]}에 위치합니다.`, channel);
      }
    } else {
      console.log('학과 사무실 안내합니다');
      rtm.sendMessage('학과 이름을 입력해주세요 (예, Architectural Engineering ) :', channel);
    }
    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};
module.exports = office;
