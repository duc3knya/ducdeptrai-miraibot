module.exports.config = {
    name: "in4",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "CatalizCS",
    description: "Xem thông tin người dùng, nhóm, ...",
    commandCategory: "info",
    usages: "[thread/user] [ID]",
    cooldowns: 20,
    dependencies: {
        "fs-extra": "",
        "path": "",
        "axios": ""
    }
  };
  
module.exports.run = async ({ event, api, Users, args }) => {
    const { join } = global.nodemodule["path"];
    const { createReadStream, unlinkSync, writeFileSync } = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];

    const { randomString } = global.utils;
    const { threadID, messageID, mentions, senderID } = event;

    async function getAvatarUser(userID) {
        try {
            const avatar = (await axios.get(`https://graph.facebook.com/${userID}/picture?width=512&height=512&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`, { responseType: "arraybuffer" } )).data;
            const random = randomString(10);
            const path = join(__dirname, "cache", `${random}.png`)
            writeFileSync(path, Buffer.from(avatar, "utf-8") );
            return path;
        }
         catch (e) {
            console.log(e);
            return api.sendMessage("Không thể lấy ảnh đại diện của người dùng!", threadID, messageID);
        }
    }

    switch (args[0]) {
        case "thread":
        case "-t": {
            try {
                const { imageSrc, approvalMode, threadName, messageCount, emoji, participantIDs, userInfo, adminIDs } = await api.getThreadInfo(args[1] || threadID);
                var maleUser = [], femaleUser = [], adminName = [], arrayUserData = [];
        
                for (const userData of userInfo) {
                userData.gender == "MALE" ? maleUser.push(userData) : femaleUser.push(userData);
                arrayUserData.push(userData);
                }
        
                for (const arrayAdmin of adminIDs) {
                    const name = await Users.getNameUser(arrayAdmin.id);
                    adminName.push(name);
                }

                const body = `»「 ${threadName} 」«\n❯ ID: ${args[1] || threadID}\n❯ Phê duyệt thành viên: ${approvalMode == true ? "Bật" : "Tắt"}\n❯ Số tin nhắn ghi được: ${messageCount} tin\n❯ Emoji của nhóm: ${emoji}\n❯ Tổng thành viên: ${participantIDs.length}\n ❯ Nam: ${maleUser.length}\n ❯ Nữ: ${femaleUser.length}\n ❯ Gay: ${participantIDs.length - (maleUser.length + femaleUser.length)}\n❯ Quản trị viên: ${adminName.join(", ")}`;

                if (imageSrc) {
                    const path = join(__dirname, "cache", `${threadID}-avatar.png`);
                    await global.utils.downloadFile(imageSrc, path);
                    return api.sendMessage({ body, attachment: createReadStream(path) }, threadID, function () { return unlinkSync(path) }, messageID);
                }
                else return api.sendMessage(body, threadID, messageID);
            }
            catch (e) {
                console.log(e);
                return api.sendMessage("Không thể lấy thông tin nhóm của bạn!", threadID, messageID);
            }
        }
        case "user":
        case "-u": {
            try {
                const mention = Object.keys(mentions);
                const data = await api.getUserInfo(args[1] || mention[0] || senderID);
                const { name, vanity, profileUrl, gender } = data[args[1] || mention[0] || senderID];
                const path = await getAvatarUser(args[1] || mention[0] || senderID);

                return api.sendMessage({
                    body: "»「 " + name + " 」«\n" +
                    "❯ Username: " + vanity + "\n" +
                    `❯ ID: ${args[1] || mention[0] || senderID}\n` +
                    "❯ Profile: " + profileUrl + "\n" +
                    `❯ Gender: ${gender == 2 ? 'Male' : gender == 1 ? 'Female' : 'UNKNOWN'}`
                , attachment: createReadStream(path)}
                , threadID, () => unlinkSync(path), messageID);
            } catch (e) { return console.log(e) }; 
        }
    }
}