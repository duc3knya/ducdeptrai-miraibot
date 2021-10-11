module.exports.config = {
	name: "danhsach",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Hướng dẫn cho người mới",
	commandCategory: "system",
	usages: "[Tên module]",
	cooldowns: 5,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 10
	}
};

module.exports.languages = {
	"vi": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Cách sử dụng: %3\n❯ Thuộc nhóm: %4\n❯ Thời gian chờ: %5 giây(s)\n❯ Quyền hạn: %6\n\n» Module code by %7 «",
		"helpList": '[ H̶i̶ệ̶n̶ ̶t̶ạ̶i̶ ̶đ̶a̶n̶g̶ ̶c̶ó̶ %1 l̶ệ̶n̶h̶ ̶c̶ó̶ ̶t̶h̶ể̶ ̶s̶ử̶ ̶d̶ụ̶n̶g̶ ̶t̶r̶ê̶n̶ ̶b̶o̶t̶ ̶n̶à̶y̶, S̶ử̶ ̶d̶ụ̶n̶g̶: "%2help nameCommand" đ̶ể̶ ̶x̶e̶m̶ ̶c̶h̶i̶ ̶t̶i̶ế̶t̶ ̶c̶á̶c̶h̶ ̶s̶ử̶ ̶d̶ụ̶n̶g̶ : 𝐁𝐎𝐓 𝐃𝐔𝐎𝐂 𝐓𝐀𝐎 𝐁𝐎𝐈 𝐀𝐃𝐌𝐈𝐍 : 𝐋𝐞𝐍𝐚𝐧𝐠𝐇𝐨𝐚𝐧𝐠𝐃𝐮𝐜 - 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 : 𝐋ê 𝐍ă𝐧𝐠 𝐇𝐨à𝐧𝐠 Đứ𝐜 - 𝐙𝐚𝐥𝐨 : 𝟎𝟑𝟒𝟓𝟑𝟒𝟒𝟖𝟐𝟔. 𝐃𝐨𝐧𝐚𝐭𝐞 𝐃𝐞 𝐂𝐨 𝐊𝐢𝐧𝐡 𝐏𝐡𝐢 𝐃𝐮𝐲 𝐓𝐫𝐢 𝐁𝐎𝐓 𝐍𝐡𝐚𝐚𝐚  ',
		"user": "Người dùng",
        "adminGroup": "Quản trị viên nhóm",
        "adminBot": "Quản trị viên bot"
	},
	"en": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
		"helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
		"user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
	}
}

module.exports.handleEvent = function ({ api, event, getText }) {
	const { commands } = global.client;
	const { threadID, messageID, body } = event;

	if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports.run = function({ api, event, args, getText }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (!command) {
		const command = commands.values();
		var group = [], msg = "";
		for (const commandConfig of command) {
			if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
			else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
		}
		group.forEach(commandGroup => msg += `「 ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} 」\n${commandGroup.cmds.join(', ')}\n\n`);
		return api.sendMessage(msg + getText("helpList", commands.size, prefix), threadID, async (error, info) =>{
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
				return api.unsendMessage(info.messageID);
			} else return;
		});

	}

	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}