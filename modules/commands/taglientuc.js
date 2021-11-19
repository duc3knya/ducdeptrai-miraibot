module.exports.config = {
    name: "taglientuc",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "VanHung & Dựa trên demo của NTKhang",
    description: "Tag liên tục người bạn tag trong 5 lần\nCó thể gọi là gọi hồn người đó",
    commandCategory: "group",
    usages: "taglientuc @mention",
    cooldowns: 90,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    var mention = Object.keys(event.mentions)[0];
    if(!mention) return api.sendMessage("Cần phải tag 1 người bạn muốn gọi hồn", event.threadID);
    let name =  event.mentions[mention];
    var arraytag = [];
        arraytag.push({id: mention, tag: name});
    var a = function (a) { api.sendMessage(a, event.threadID); }
a("R.I.P em");
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 3000);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 4000);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 5000);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 6000);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 6500);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 7000);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 7500);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 8000);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 8500);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 9000);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 9500);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 10000);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 10500);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 11000);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 11500);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 12000);
setTimeout(() => {a({body: "ra đây donate vào momo 0948461545 đi" + " " + name, mentions: arraytag})} , 12500);
setTimeout(() => {a({body: "ra đây donate vào momo 0948461545 đi" + " " + name, mentions: arraytag})} , 13000);
setTimeout(() => {a({body: "ra đây donate vào momo 0948461545 đi" + " " + name, mentions: arraytag})} , 13500);
setTimeout(() => {a({body: "ra đây donate vào momo 0948461545 đi" + " " + name, mentions: arraytag})} , 14000);
setTimeout(() => {a({body: "ra đây donate vào momo 0948461545 đi" + " " + name, mentions: arraytag})} , 14500);
setTimeout(() => {a({body: "ra đây donate vào momo 0948461545 đi" + " " + name, mentions: arraytag})} , 15000);
setTimeout(() => {a({body: "ra đây donate vào momo 0948461545 đi" + " " + name, mentions: arraytag})} , 15500);
setTimeout(() => {a({body: "ra đây donate vào momo 0948461545 đi" + " " + name, mentions: arraytag})} , 16000);
setTimeout(() => {a({body: "ra đây chơi em" + " " + name, mentions: arraytag})} , 16500);
setTimeout(() => {a({body: "ra đây chơi với Đức cute điii" + " " + name, mentions: arraytag})} , 17000);
setTimeout(() => {a({body: "ra đây chơi với anh Đức đehp trai nào" + " " + name, mentions: arraytag})} , 17500);
setTimeout(() => {a({body: "ra đây chơi với giẻ rách Long" + " " + name, mentions: arraytag})} , 18000);
setTimeout(() => {a({body: "tag chết con đĩ mẹ m giờ" + " " + name, mentions: arraytag})} , 18500);
setTimeout(() => {a({body: "ủa alo" + " " + name, mentions: arraytag})} , 19000);
setTimeout(() => {a({body: "ra đây chơi không địt mẹ mày" + " " + name, mentions: arraytag})} , 19500);
setTimeout(() => {a({body: "ra đây chơi em với anh đi em" + " " + name, mentions: arraytag})} , 20000);
setTimeout(() => {a({body: "ra chơi với admin đức chim dài" + " " + name, mentions: arraytag})} , 20500);
setTimeout(() => {a({body: "đùa à đmm" + " " + name, mentions: arraytag})} , 21000);
setTimeout(() => {a({body: "địt cụ mày ra đây" + " " + name, mentions: arraytag})} , 21500);
setTimeout(() => {a({body: "địt cụ mày ra đây" + " " + name, mentions: arraytag})} , 22000);
 }