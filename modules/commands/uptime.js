module.exports.config = {
	name: "uptime",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Kiểm tra thời gian bot đã online",
	commandCategory: "system",
	cooldowns: 5,
	dependencies: {
		"pidusage": ""
	}
};

function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.languages = {
	"vi": {
		"returnResult": "Uptime: %1 : %2 : %3\n\n❯ Total users: %4\n❯ Total Threads: %5\n❯ Cpu usage: %6%\n❯ RAM usage: %7\n❯ Ping: %8ms"
	},
	"en": {
		"returnResult": "Bot has been working for %1 hour(s) %2 minute(s) %3 second(s).\n\n❯ Total users: %4\n❯ Total Threads: %5\n❯ Cpu usage: %6%\n❯ RAM usage: %7\n❯ Ping: %8ms"
	}
}

module.exports.run = async ({ api, event, getText }) => {
	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);

	const pidusage = await global.nodemodule["pidusage"](process.pid);

	const timeStart = Date.now();
	return api.sendMessage("", event.threadID, () => api.sendMessage(getText("returnResult", hours, minutes, seconds, global.data.allUserID.length, global.data.allThreadID.length, pidusage.cpu.toFixed(1), byte2mb(pidusage.memory), Date.now() - timeStart), event.threadID, event.messageID));
}