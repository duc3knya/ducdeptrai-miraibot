/**
* @author ProCoderMew
* @warn Do not edit code or edit credits
*/

module.exports.config = {
    name: "tiktok",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ProCoderMew",
    description: "Get tiktok video without watermark",
    commandCategory: "media",
    usages: "[url]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": ""
    },
    envConfig: {
        APIKEY: ""
    }
};

module.exports.run = async function({ api, event, args }) {
    const { APIKEY } = global.configModule.tiktok;
    const { createReadStream, unlinkSync, writeFileSync } = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    const { threadID, messageID } = event;
    if (args.length == 0) return api.sendMessage("Da co loi xay ra");
    var { data } = await axios.get(`https://meewmeew.info/tiktok/api?url=${args[0]}&apikey=${APIKEY}`);
    var path = __dirname + `/cache/tiktok.mp4`;
    if (data.success == false) return api.sendMessage(data.error, threadID, messageID);
    else {
        const { data: stream } = await axios.get(data.url, { responseType: 'arraybuffer' });
        writeFileSync(path, Buffer.from(stream, 'utf-8'));
        return api.sendMessage({ attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);       
    }
}
