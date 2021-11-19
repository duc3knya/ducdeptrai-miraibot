module.exports.config = {
    name: "cobac",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Syn",
    description: "Đánh bạc Bầu Cua Tôm Cá",
    commandCategory: "game-sp",
    usages: "[số tiền cần đặt]",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args, Currencies }) {
    const baucuaItems = ["🦐","🍐","🐠","🦀"];
    const moneyUser = (await Currencies.getData(event.senderID)).money;
    var moneyBet = parseInt(args[0]);
    if (isNaN(moneyBet) || moneyBet <= 0) return api.sendMessage("[ Bầu Cua ] Số tiền đặt cược không được để trống hoặc là số tiền âm", event.threadID, event.messageID);
	if (moneyBet > moneyUser) return api.sendMessage("[ Bầu Cua ] Số tiền bạn đặt lớn hơn số dư của bạn!", event.threadID, event.messageID);
	if (moneyBet < 50) return api.sendMessage("[ Bầu Cua ] Số tiền đặt không được dưới 50 Đô!", event.threadID, event.messageID);
    var number = [], win = false;
    for (i = 0; i < 3; i++) number[i] = Math.floor(Math.random() * baucuaItems.length);
    if (number[0] == number[1] && number[1] == number[2]) {
        moneyBet *= 9;
        win = true;
    }
    else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
        moneyBet *= 2;
        win = true;
    }
    switch (win) {
        case true: {
            api.sendMessage(`🎲 ${baucuaItems[number[0]]} | ${baucuaItems[number[1]]} | ${baucuaItems[number[2]]} 🎮\nBạn đã thắng với ${moneyBet} Đô`, event.threadID, event.messageID);
            await Currencies.increaseMoney(event.senderID, moneyBet);
            break;
        }
        case false: {
            api.sendMessage(`🎲 » ${baucuaItems[number[0]]} | ${baucuaItems[number[1]]} | ${baucuaItems[number[2]]} « 🎮\nBạn đã thua và mất ${moneyBet} Đô`, event.threadID, event.messageID);
            await Currencies.decreaseMoney(event.senderID, moneyBet);
            break;
        }
    }
}