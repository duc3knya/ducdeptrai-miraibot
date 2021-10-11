module.exports.config = {
	name: "jimmy",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "manhIT",
	description: "Xem ảnh Jimmy",
	commandCategory: "random-img",
	usages: "boy",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
	const request = global.nodemodule["request"];
	const fs = global.nodemodule["fs-extra"];
	const axios = global.nodemodule["axios"];
	axios.get('https://api.vangbanlanhat.tk/image?type=jimmy').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
						body: `Jimmy 🤡🤡`,
						attachment: fs.createReadStream(__dirname + `/cache/jim.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/jim.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/jim.${ext}`)).on("close", callback);
			})
}