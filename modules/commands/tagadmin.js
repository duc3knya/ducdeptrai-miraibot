module.exports.config = {
  name: "tagadmin",
  version: "1.0.0-beta-fixbyDungUwU",
  hasPermssion: 0,
  credits: "ZyrosGenZ-fixbyDungUwU",
  description: "Bot sẽ rep ng tag admin hoặc rep ng tagbot ",
  commandCategory: "Other",
  usages: "",
  cooldowns: 1,
   dependencies: {}
};
module.exports.handleEvent = function({ api, event }) {
  var { threadID, messageID, senderID } = event;
  if(senderID == api.getCurrentUserID()) return
  if (event.senderID !== "100023218892470") {//id bot
    var aid = ["100038379006171"];//id admin(s)
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
        var msg = ["Tag lần nữa bố ban khỏi dùng", " lần nữa tao đấm cho đấy", "Đã bảo đừng tag mà, thích ăn đấm hả😠", "Đĩ mẹ mày thích tag không con chó 😏"];//(các) câu bot rep
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, threadID, messageID);
    }
    }}
};
module.exports.run = async function({}) {}