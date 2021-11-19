module.exports.config = {
    name: "aminhien",
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
    if (!fs.existsSync(dirMaterial + "adminhien.gif")) request("https://media2.giphy.com/media/dTIYq1aptomoqUl54c/giphy.gif?cid=790b7611ecb0751acc6e9ff692925c00770484a4b37e298b&rid=giphy.gif&ct=g").pipe(fs.createWriteStream(dirMaterial + "adminhien.gif"));
}
module.exports.handleEvent = async ({ event, api, Currencies,Users, args, utils, global, client }) => {
    const fs = require("fs");
    let name = await Users.getNameUser(event.senderID)
    var msg = {
                body: `${name} đâ𝚢, để 𝚋𝚘𝚝 𝚐𝚒ớ𝚒 𝚝𝚑𝚒ệ𝚞 𝚌𝚑𝚘 𝚗è :)))) \n★Thông Tin Admin Bot Này★\nADMIN NAME :Văn Hiền\nBiệt Danh : Eric\nGiới Thiệu: ~~ hiền yêu tất cả các mem, Hiền thích độc thân\nI Have Something To You\nI Love You\nTính Cách : Hòa đồng. Vui vẻ. Thân thiện\nChiều cao : 1m76\nSinh ngày : 07/02/2004\nLiên hệ:0399490015\nTikTok: kh cóa\nSở Thích: Ngắm những bạn nữ cute và chơi game \nCân nặng: 53\nLink fb : https://www.facebook.com/profile.php?id=100036047522135 \nVài lời tới người dùng BOT: Vui lòng không spam khi sử dụng để tránh die bot. Cảm ơn mọi người đã sử dụng đên con bot của mình.\nLưu ý : Đừng có dại dột mà add 2 bot kẻo bị phát hiện là bạn toang đó ❤\nCảnh báo : Vui lòng không dùng bot với mục đích xấu hay cố ý report acc facebook\nChúc bạn sử dụng vui vẻ ❤\n=== BUI VAN HIEN  ===`,
                attachment: fs.createReadStream(__dirname + `/noprefix/adminhien.gif`)
            }
    if (event.body.toLowerCase() == "hiền là ai"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "hiền là thằng nào"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "hiền đâu"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "ad hiền đâu"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "ad hiền là ai"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
        };
module.exports.run = async ({ event, api, Currencies, args, utils }) => {
return api.sendMessage("Dùng sai cách rồi thằng óc lợn noprefix mà",event.threadID)
    }