module.exports.config = {
	name: "cosplay",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "manhIT",
	description: "Xem ảnh Cosplay",
	commandCategory: "random-img",
	usages: "cosplay",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
	const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
	axios.get('https://api.berver.tech/cosplay').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
						body: `Ảnh cosplay giành cho bạn 🤩`,
						attachment: fs.createReadStream(__dirname + `/cache/cosplay.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/cosplay.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/cosplay.${ext}`)).on("close", callback);
			})
}