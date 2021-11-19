module.exports.config = {
    name: "aminducne",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "HTHB",
    description: "",
    commandCategory: "không cần dấu lệnh",
    usages: "",
    cooldowns: 0,
    denpendencies: {
        "fs": "",
        "request": ""
    }
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "adminduc.gif")) request("https://media3.giphy.com/media/8lcy5k6iRvybNl1IFX/giphy.gif").pipe(fs.createWriteStream(dirMaterial + "adminduc.gif"));
}
module.exports.handleEvent = async ({ event, api, Currencies,Users, args, utils, global, client }) => {
    const fs = require("fs");
    let name = await Users.getNameUser(event.senderID)
    var msg = {
                body: `${name} đâ𝚢, để 𝚋𝚘𝚝 𝚐𝚒ớ𝚒 𝚝𝚑𝚒ệ𝚞 𝚌𝚑𝚘 𝚗è :)))) \n★Thông Tin Admin Bot Này★\nADMIN NAME :Lê Năng Hoàng Đức\ Biệt Danh : ducngao ~~\nGiới Thiệu: Nhà anh không có gì ngoài nợ ngân hàng 10 tỉ\nI Have Something To You\nI Love You\nTính Cách : Cái gì cái chứ trêu gái là nhanh nhất nhé OwO\nChiều cao : 1m? \nSinh ngày : 24/05/200?\nLiên hệ:0345344826\nTikTok: lnhoangduc_siucapdeptrai\nSở Thích: Thích Nghịch Đủ Thứ \nCân nặng: 49kg\nUID FACEBOOK100048991791143: \nName ID Le Nang Hoang Duc \nLink Facebook : https://www.facebook.com/Mark.Zuckerberg2405\nVài lời tới người dùng BOT: Vui lòng không spam khi sử dụng để tránh die bot. Cảm ơn mọi người đã sử dụng đên con bot của mình.\nLưu ý : Đừng có dại dột mà add 2 bot kẻo bị phát hiện là bạn toang đó <3\nCảnh báo : Vui lòng không dùng bot với mục đích xấu hay cố ý report acc facebook\nChúc bạn sử dụng vui vẻ <3\n=== Le Nang Hoang Duc === ❤️`,
                attachment: fs.createReadStream(__dirname + `/noprefix/adminduc.gif`)
            }
    if (event.body.toLowerCase() == "đức là ai"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "đức là thằng nào"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "admin đâu"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "ad đâu"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "ad là ai"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
        };
module.exports.run = async ({ event, api, Currencies, args, utils }) => {
return api.sendMessage("Dùng sai cách rồi thằng óc lợn noprefix mà",event.threadID)
    }