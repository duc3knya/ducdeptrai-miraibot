/**
* @author ProCoderMew
* @warn Do not edit code or edit credits
*/

module.exports.config = {
	name: "covid",
	version: "2.1.1",
	hasPermssion: 0,
	credits: "ProCoderMew",
	description: "Lấy thông tin về tình hình dịch bệnh COVID-19",
	commandCategory: "other",
	usages: "",
	cooldowns: 5,
    dependencies: {
        "axios": ""
    },
    envConfig: {
        APIKEY: "Meew_t4wMHyPbko5rRTklYS9gpguHCf7RKC"
    }
};

module.exports.run = async function({ api, event }) {
    const axios = global.nodemodule["axios"];
    const { APIKEY } = global.configModule.covid;
    var { data } = await axios.get("https://meewmeew.info/covid?apikey=" + APIKEY);
    if (data.success == false) return api.sendMessage(data.error, event.threadID);
    var world = data.world,
        vn = data.vietnam,
        news = data.news,
        nhiemtg = world.cases,
        chettg = world.deaths,
        hoiphuctg = world.recovered,
        nhiemvn = vn.cases,
        chetvn = vn.deaths,
        hoiphucvn = vn.recovered,
        dieutrivn = vn.recovering,      
        ptchetvn = Math.round(chetvn.replace(/\./g,"") * 100 / nhiemvn.replace(/\./g,"")),
        pthoiphucvn = Math.round(hoiphucvn.replace(/\./g,"") * 100 / nhiemvn.replace(/\./g,"")),
        ptchettg = Math.round(chettg.replace(/\./g,"") * 100 / nhiemtg.replace(/\./g,"")),
        pthoiphuctg = Math.round(hoiphuctg.replace(/\./g,"") * 100 / nhiemtg.replace(/\./g,"")),
        pthoiphucvn = pthoiphucvn.toString().split(".")[0],
        ptdieutrivn = (100 - pthoiphucvn - ptchetvn).toString().split(".")[0];
    ptchetvn = ptchetvn.toString().split(".")[0];
    pthoiphuctg = pthoiphuctg.toString().split(".")[0];
    ptchettg = ptchettg.toString().split(".")[0];    
    return api.sendMessage(
        '====== Thế Giới ======\n' +
        `😷 Nhiễm: ${nhiemtg}\n` +
        `💚 Hồi phục: ${hoiphuctg} (${pthoiphuctg}%)\n` +
        `💀 Tử vong: ${chettg} (${ptchettg}%)\n` +
        '====== Việt Nam ======\n' +
        `😷 Nhiễm: ${nhiemvn}\n` +
        `💉 Đang điều trị: ${dieutrivn} (${ptdieutrivn}%)\n` +
        `💚 Hồi phục: ${hoiphucvn} (${pthoiphucvn}%)\n` +
        `💀 Tử vong: ${chetvn} (${ptchetvn}%)\n\n` +
        `Tin tức: ${news.vietnam}\n` +
        `Cập nhật: ${data.time}`, event.threadID
    );
}