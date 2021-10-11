module.exports.config = {
	name: "globalshort",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "CatalizCS",
	description: "Phiên bản xịn hơn của short",
	commandCategory: "system",
    usages: "[all/delete/empty]",
	cooldowns: 5,
	dependencies: {
		"fs-extra": "",
        "path": ""
	}
}

module.exports.onLoad = function () {
    const { existsSync, writeFileSync, mkdirSync, readFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, "cache", "shortcutglobal.json");
    const pathGif = resolve(__dirname, "cache", "shortcutGif");
    const pathMp3 = resolve(__dirname, 'cache', 'shortcutMp3');
    const pathMp4 = resolve(__dirname, 'cache', 'shortcutMp4');
   // const pathJPEG = resolve(__dirname, 'cache', 'shortcutJPEG');

    if (!global.moduleData.shortcuts) global.moduleData.shortcuts = [];

    if (!existsSync(path)) writeFileSync(path, JSON.stringify([]), "utf-8");
    if (!existsSync(pathGif)) mkdirSync(pathGif, { recursive: true });
    if (!existsSync(pathMp3)) mkdirSync(pathMp3, { recursive: true });
    if (!existsSync(pathMp4)) mkdirSync(pathMp4, { recursive: true });
    //if (!existsSync(pathJPEG)) mkdirSync(pathJPEG, { recursive: true });
    
    const data = JSON.parse(readFileSync(path, "utf-8"));

    global.moduleData.shortcuts = data;

    return;
}

module.exports.handleEvent = async function ({ event, api, Users }) {
    const { threadID, messageID, body, senderID } = event;
    if (!global.moduleData.shortcuts) global.moduleData.shortcut = [];
    if (global.moduleData.shortcuts.length == 0) return;
    const data = global.moduleData.shortcuts;

    if (data.some(item => item.input == body)) {
        const { resolve } = global.nodemodule["path"];
        const { existsSync, createReadStream } = global.nodemodule["fs-extra"];
        const dataThread = data.find(item => item.input == body);
        const path = resolve(__dirname, "cache", "shortcutGif", `${dataThread.id}.gif`) || resolve(__dirname, "cache", "shortcutMp3", `${dataThread.id}.mp3`) ||
        resolve(__dirname, "cache", "shortcutMp4", `${dataThread.id}.mp4`) || resolve(__dirname, "cache", "shortcutJPEG", `${dataThread.id}.jpeg`);
        
        var object, output;
        var output = dataThread.output;
        if (/\{name}/g.test(output)) {
            const name = global.data.userName.get(senderID) || await Users.getNameUser(senderID);
            output = output.replace(/\{name}/g, name);
        }
        
        if (existsSync(path)) object = { body: output, attachment: createReadStream(path) }
        else object = { body: output };
        
        return api.sendMessage(object, threadID, messageID);

    }
}

module.exports.handleReply = async function ({ event, api, handleReply }) {
    if (handleReply.author != event.senderID) return;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const { threadID, messageID, senderID, body } = event;
    const name = this.config.name;

    const path = resolve(__dirname, "cache", "shortcutglobal.json");

    switch (handleReply.type) {
        case "requireInput": {
            if (body.length == 0) return api.sendMessage("「Shortcut」Câu trả lời không được để trống!", threadID, messageID);
            const data = global.moduleData.shortcuts;
            if (data.some(item => item.input == body)) return api.sendMessage("「Shortcut」Input đã tồn tại từ trước!", threadID, messageID);
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage("「Shortcut」Reply tin nhắn này để nhập câu trả lời khi sử dụng từ khóa", threadID, function (error, info) {
                return global.client.handleReply.push({
                    type: "requireOutput",
                    name,
                    author: senderID,
                    messageID: info.messageID,
                    input: body
                });
            }, messageID);
        }
        case "requireOutput": {
            if (body.length == 0) return api.sendMessage("「Shortcut」Câu trả lời không được để trống!", threadID, messageID);
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage("「Shortcut」Reply tin nhắn này để nhập tệp đính kèm(url có thể download) hoặc nếu không cần bạn có thể reply tin nhắn này và nhập 's'", threadID, function (error, info) {
                return global.client.handleReply.push({
                    type: "requireGif",
                    name,
                    author: senderID,
                    messageID: info.messageID,
                    input: handleReply.input,
                    output: body
                });
            }, messageID);
        }
        case "requireGif": {
            const id = global.utils.randomString(10);
            if (body.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:gif|GIF|mp4|MP4|mp3|MP3|j?peg|png|jpg)/g)) {
                const pathGif = resolve(__dirname, "cache", "shortcutGif", `${id}.gif`);
                const pathMp3 = resolve(__dirname, "cache", "shortcutMp3", `${id}.mp3`);
                const pathMp4 = resolve(__dirname, "cache", "shortcutMp4", `${id}.mp4`);
               // const pathJPEG = resolve(__dirname, "cache", "shortcutJPEG", `${id}.jpeg`);
                try {
                    await global.utils.downloadFile(body, pathGif) || await global.utils.downloadFile(body, pathMp3) ||  await global.utils.downloadFile(body, pathMp4); 
                    // || await global.utils.downloadFile(body, pathJPEG);
                } catch (e) { return api.sendMessage("「Shortcut」Không thể tải file vì url không tồn tại hoặc bot đã xảy ra vấn đề về mạng!", threadID, messageID); }
            }
            
            const readData = readFileSync(path, "utf-8");
            var data = JSON.parse(readData);
            const object = { id, input: handleReply.input, output: handleReply.output };

            data.push(object);

            global.moduleData.shortcuts = data;
            writeFileSync(path, JSON.stringify(data, null, 4), "utf-8");

            return api.sendMessage(`「Shortcut」Đã thêm thành công shortcut mới, dưới đây là phần tổng quát:\n- ID: ${id}\n- Input: ${handleReply.input}\n- Output: ${handleReply.output}`, threadID, messageID);
        }
    }
}

module.exports.run = function ({ event, api, args }) {
    const { readFileSync, writeFileSync, existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const { threadID, messageID, senderID } = event;
    const name = this.config.name;

    const path = resolve(__dirname, "cache", "shortcutglobal.json");

    switch (args[0]) {
        case "remove":
        case "delete":
        case "del":
        case "-d": {
            const readData = readFileSync(path, "utf-8");
            var data = JSON.parse(readData);
            if (data.length == 0) return api.sendMessage("「Shortcut」hiện tại chưa có shortcut nào được set!", threadID, messageID);
            var indexNeedRemove;

            if (isNaN(args[1])) indexNeedRemove = args[1];
            else indexNeedRemove = data.findIndex(item => item.input == (args.slice(1, args.length)).join(" ") || item.id == (args.slice(1, args.length)).join(" "));
            
            data.splice(indexNeedRemove, 1);
            global.moduleData.shortcuts.splice(indexNeedRemove, 1);

            writeFileSync(path, JSON.stringify(data, null, 4), "utf-8");

            return api.sendMessage("「Shortcut」Đã xóa thành công!", threadID, messageID);
        }

        case "list":
        case "all":
        case "-a": {
            const data = global.moduleData.shortcuts;
            var array = [];
            if (data.length == 0) return api.sendMessage("「Shortcut」hiện tại chưa có shortcut nào được set!", threadID, messageID);
            else {
                var n = 1;
                for (const single of data) {
                    const path = resolve(__dirname, "cache", "shortcutGif", `${single.id}.gif`) || resolve(__dirname, "cache", "shortcutMp3", `${single.id}.mp3`) || resolve(__dirname, "cache", "shortcutMp4", `${single.id}.mp4`);
                     //|| resolve(__dirname, "cache", "shortcutJPEG", `${single.id}.jpeg`);
                    var existPath = false;
                    if (existsSync(path)) existPath = true;
                    array.push(`${n++}/ ${single.input} => ${single.output} (${(existPath) ? "YES" : "NO"})`);
                }
                return api.sendMessage(`「Shortcut」Dưới đây là toàn bộ shortcut có:\n[stt]/ [Input] => [Output] (exist gif/mp3/mp4)\n\n${array.join("\n")}`, threadID, messageID);
            }
        }

        default: {
            return api.sendMessage("「Shortcut」Reply tin nhắn này để nhập từ khóa cho shortcut", threadID, function (error, info) {
                return global.client.handleReply.push({
                    type: "requireInput",
                    name,
                    author: senderID,
                    messageID: info.messageID
                });
            }, messageID);
        }
    }   
}