module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người rời khỏi nhóm",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};

module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "𝒕ự 𝒄ú𝒕" : "𝒃ị 𝒒𝒖ả𝒏 𝒕𝒓ị 𝒗𝒊ê𝒏 đá";
	const path = join(__dirname, "cache", "leaveGif");
	const gifPath = join(path, `1.gif`);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") ? msg = "𝘾ụ𝙘 𝙧á𝙘 {name} đã 𝒃ị 𝒏ứ𝒏𝒈 𝒃𝒖ồ𝒊 𝒏ê𝒏 {type} 𝒌𝒉ỏ𝒊 𝒃𝒐𝒙 𝒄𝒉𝒂𝒕 𝒄ó 𝒄𝒐𝒏 𝒃𝒐𝒕 𝒅ễ 𝒕𝒉ươ𝒏𝒈 𝒄ó 102 𝒏à𝒚 😏" : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

	if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) }
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
}