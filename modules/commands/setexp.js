module.exports.config = {
	name: "setexp",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "manhIT",
	description: "Điều chỉnh thông tin của người dùng",
	commandCategory: "system",
	usages: "[add/set/clean] [Số exp] [Tag người dùng]",
	cooldowns: 5
};

module.exports.run = async function ({ event, api, Currencies, args }) {
    const { threadID, messageID, senderID } = event;
    const { throwError }          = global.utils;
    const mentionID               = Object.keys(event.mentions);
    const exp                   = parseInt(args[1]);

    var message                   = [];
    var error                     = [];

    switch (args[0]) {
        case "add": {
            if (mentionID.length != 0) {
                for (singleID of mentionID) {
                    if (!exp || isNaN(exp)) return throwError(this.config.name, threadID, messageID);
                    try {
                        await Currencies.increaseexp(singleID, exp);
                        message.push(singleID);
                    } catch (e) { error.push(e);  console.log(e) };
                }
                return api.sendMessage(`[exp] Đã cộng thêm ${exp} cho ${message.length} người`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Không thể thể cộng thêm exp cho ${error.length} người!`, threadID) }, messageID);
            } else {
                if (!exp || isNaN(exp)) return throwError(this.config.name, threadID, messageID);
                try {
                    await Currencies.increaseexp(senderID, exp);
                    message.push(senderID);
                } catch (e) { error.push(e) };
                return api.sendMessage(`[exp] Đã cộng thêm ${exp} cho bản thân`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Không thể thể cộng thêm exp cho bản thân!`, threadID) }, messageID);
            }
        }

        case "set": {
            if (mentionID.length != 0) {
                for (singleID of mentionID) {
                    if (!exp || isNaN(exp)) return throwError(this.config.name, threadID, messageID);
                    try {
                        await Currencies.setData(singleID, { exp });
                        message.push(singleID);
                    } catch (e) { error.push(e) };
                }
                return api.sendMessage(`[exp] Đã set thành công ${exp} cho ${message.length} người`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Không thể set exp cho ${error.length} người!`, threadID) }, messageID);
            } else {
                if (!exp || isNaN(exp)) return throwError(this.config.name, threadID, messageID);
                try {
                    await Currencies.setData(senderID, { exp });
                    message.push(senderID);
                } catch (e) { error.push(e) };
                return api.sendMessage(`[exp] Đã set thành công ${exp} cho bản thân`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Không thể set exp cho bản thân!`, threadID) }, messageID);
            }
        }

        case "clean": {
            if (mentionID.length != 0) {
                for (singleID of mentionID) {
                    try {
                        await Currencies.setData(singleID, { exp: 0 });
                        message.push(singleID);
                    } catch (e) { error.push(e) };
                }
                return api.sendMessage(`[exp] Đã xóa thành công toàn bộ exp của ${message.length} người`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Không thể xóa toàn bộ exp của ${error.length} người!`, threadID) }, messageID);
            } else {
                try {
                    await Currencies.setData(senderID, { exp: 0 });
                    message.push(senderID);
                } catch (e) { error.push(e) };
                return api.sendMessage(`[exp] Đã xóa thành công exp của cho bản thân`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Không thể xóa toàn bộ exp của bản thân!`, threadID) }, messageID);
            }
        }
        
        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    }
}