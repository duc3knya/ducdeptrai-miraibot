module.exports.config = {
    name: "rps",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "JustGon", //Giữ Credit tôn trọng thằng làm ra
    description: "búa bao kéo",
    commandCategory: "rps",
    usages: "[tag]",
    cooldowns: 5,
    dependencies: {
    }
};
module.exports.run = async function ({ event, api, args }) {
    function outMsg(data) {
        api.sendMessage(data, event.threadID, event.messageID);
       }
    if(!args[0]) {
        outMsg("Sai Format, Vui lòng nhập !rps ✌️ hoặc 👊 hoặc ✋")
    }
    var turnbot = ["✌️","👊","✋"]
          var botturn = turnbot[Math.floor(Math.random() * turnbot.length)] 
          var userturn = args.join( " ")
          if (userturn == "✌️"||userturn == "👊"||userturn == "✋") {
            if (userturn == turnbot) {
              return outMsg(`Hòa\nUser : ${userturn}\nBot : ${botturn} `)
            } else if (userturn == "✌️") {
              if (botturn == "👊") {
                return outMsg(`Bot win\nUser : ${userturn}\nBot : ${botturn} `)
              } else if (botturn == "✋") {
                return outMsg(`User win\nUser : ${userturn}\nBot : ${botturn} `)
            }
          } else if (userturn == "👊") {
            if (botturn == "✋") {
              return outMsg(`Bot win\nUser : ${userturn}\nBot : ${botturn} `)
            } else if (botturn == "✌️") {
              return outMsg(`User win\nUser : ${userturn}\nBot : ${botturn} `)
          }
        } else if (userturn == "✋") {
          if (botturn == "✌️") {
            return outMsg(`Bot win\nUser : ${userturn}\nBot : ${botturn} `)
          } else if (botturn == "👊") {
            return outMsg(`User win\nUser : ${userturn}\nBot : ${botturn} `)
        }
      }
        } else {
          return outMsg("")
        }
}