const Discord = require('discord.js');
const translate = require('google-translate-api');
const client = new Discord.Client();
const PREFIX = "-";

var responses = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
];

var rps = [
  "Rock",
  "Paper",
  "Scissors",
];

/*var cardjitsu = [
  "FIRE",
  "WATER",
  "SNOW",
];*/

function perms(array) {
  return array.map(function(item){
    return item["name"]
  })
}
function hasRole(member, role) {
  if(perms(member.roles).includes(role)){
    return true;
  } else {
    return false;
  }
}

const embedHelp = new Discord.RichEmbed();
embedHelp.setAuthor("TempBot", "http://i.imgur.com/JOUdoSf.png")
.setTitle("List of available commands:")
.setColor(0x78F7FE)
.setThumbnail("http://i.imgur.com/IjgeTrM.png")
.addField("-avatar", "Replies with your Discord avatar in case you lost it. Usage: `-avatar [user]`")
.addField("-count", "Replies with if your message is over 48 characters. Usage: `-count [message]`")
.addField("-serverinfo", "Get the stats of the current server. Usage: `-serverinfo`")
.addField("-purge", "Deletes the past 100 messages. Cannot delete messages over 2 weeks old. Requires `Admin` Role. Usage: `-purge`")
.addField("-timezone", "Replies with the current time in a timezone. Usage: `-timezone [timezone abbreviation]`")
.addField("-8ball", "Responds with a magical... reponse. Usage: `-8ball [question]`")
.addField("-calculate", "Adds, Subtracts, Multiplies and Divides with up to 3 numbers. Usage: `-calculate [number] [symbol] [number]` (Disabled Currently)")
.addField("-translate", "Translate words or phrases from different languages. Usage: `-translate [languageFrom/auto] [languageTo] [word/phrase]` (WIP)")
.addField("-rps", "Plays a game of Rock Paper Scissors. Usage: `-rps [rock/paper/scissors]`")
.setFooter("beep boop REEEEEEE | Last Updated: 05/08/17")

client.on('ready', () => {
  console.log('Bot Started.');
  client.user.setGame("Beep Boop | -help");
});

/*client.on('guildMemberAdd', member => {
  var channelGeneral = member.guild.channels.find("name", "general");
  if (!channelGeneral) return;
  channelGeneral.send(`Welcome ${member} to the server!`)
});

client.on('guildMemberRemove', member => {
  var channelGeneral = member.guild.channels.find("name", "general");
  if (!channelGeneral) return;
  channelGeneral.send(`Farewell ${member}.`)
});*/

client.on('message', message => {
  if (message.author.equals(client.user)) return;

  if (message.content.toLowerCase() === "k") {
    message.reply("K")
  }

  if (!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0].toLowerCase()) {
    case "ping":
      message.reply("Pong! :ping_pong:")
      break;
    case "8ball":
      if (args[1]) {
        message.reply(responses[Math.floor(Math.random() * responses.length)])
      } else {
        message.reply("Error.")
      }
      break;
    case "rolldice": case "dice":
      message.reply(Math.floor(Math.random() * 6) + 1)
      break;
    case "rps": case "spr":
      if (args[1]) {
        var rpsOpponent = args[1].toLowerCase();
        var rpsChallenger = rps[Math.floor(Math.random() * rps.length)];
        switch (rpsOpponent) {
          case "rock":
            if (rpsChallenger === "Paper") {message.reply(rpsChallenger + " | I Win!")}
            else if (rpsChallenger === "Rock") {message.reply(rpsChallenger + " | It's a tie!")}
            else {message.reply(rpsChallenger + " | You win!")}
            break;
          case "paper":
            if (rpsChallenger === "Scissors") {message.reply(rpsChallenger + " | I Win!")}
            else if (rpsChallenger === "Paper") {message.reply(rpsChallenger + " | It's a tie!")}
            else {message.reply(rpsChallenger + " | You win!")}
            break;
          case "scissors":
            if (rpsChallenger === "Rock") {message.reply(rpsChallenger + " | I Win!")}
            else if (rpsChallenger === "Scissors") {message.reply(rpsChallenger + " | It's a tie!")}
            else {message.reply(rpsChallenger + " | You win!")}
            break;
          default: message.reply("Error. What is this, Card-Jitsu? That's not an allowed choice!")
        }
      } else {
        message.reply("Error.")
      }
      break;
    case "count":
      var messageCount = message.content.length - 7;
      if (messageCount <= 48) {
        message.reply("It fits.\n*(Character Count: `" + messageCount + "`)*")
      } else {
        message.reply("Too long, try shortening it or breaking it into multiple lines.\n*(Character Count: `" + messageCount + "`)*")
      }
      break;
    case "avatar":
      var userMentioned = message.mentions.users.first()
      if (!userMentioned) {
        message.reply(message.author.avatarURL)
      } else {
        message.reply(userMentioned.avatarURL)
      }
      break;
    case "serverinfo": case "info":
      var embedServerInfo = new Discord.RichEmbed();
      embedServerInfo.addField("Server Name", message.guild.name)
      .setColor("7289DA")
      .addField("Server Owner", message.guild.owner.user.username)
      .addField("Amount of Roles", message.guild.roles.filter(r => r.name).size)
      .addField("Created on", message.guild.createdAt)
      .setThumbnail(message.guild.iconURL)
      .setTimestamp()
      message.channel.sendEmbed(embedServerInfo)
      break;
    case "help":
      message.channel.sendEmbed(embedHelp);
      //message.author.sendEmbed(embedHelp);
      //message.reply("A list of my commands has been sent to your Private Messages.")
      break;
    case "purge":
      if (hasRole(message.member, "Admin")) {
        message.channel.bulkDelete(100);
        console.log("Deleted 100 messages in " + message.channel.id)
      } else {
        message.reply("You do not have the required role to use this command.")
      }
      break;
    case "timezone": case "tz":
      var timezoneGet = new Date();
      var timezoneHours = timezoneGet.getUTCHours();
      var timezoneMinutes = timezoneGet.getUTCMinutes();
      var timezoneDay = timezoneGet.getUTCDay();
      var timezoneDate = timezoneGet.getUTCDate();
      var timezoneMonth = timezoneGet.getUTCMonth();
      switch (timezoneMinutes) {
        case 0:
        timezoneMinutes = "00"
        break;
        case 1:
        timezoneMinutes = "01"
        break;
        case 2:
        timezoneMinutes = "02"
        break;
        case 3:
        timezoneMinutes = "03"
        break;
        case 4:
        timezoneMinutes = "04"
        break;
        case 5:
        timezoneMinutes = "05"
        break;
        case 6:
        timezoneMinutes = "06"
        break;
        case 7:
        timezoneMinutes = "07"
        break;
        case 8:
        timezoneMinutes = "08"
        break;
        case 9:
        timezoneMinutes = "09"
        break;
        case 10:
        timezoneMinutes = "10"
        break;
        case 11:
        timezoneMinutes = "11"
        break;
        case 12:
        timezoneMinutes = "12"
        break;
        case 13:
        timezoneMinutes = "13"
        break;
        case 14:
        timezoneMinutes = "14"
        break;
        case 15:
        timezoneMinutes = "15"
        break;
        case 16:
        timezoneMinutes = "16"
        break;
        case 17:
        timezoneMinutes = "17"
        break;
        case 18:
        timezoneMinutes = "18"
        break;
        case 19:
        timezoneMinutes = "19"
        break;
        case 20:
        timezoneMinutes = "20"
        break;
        case 21:
        timezoneMinutes = "21"
        break;
        case 22:
        timezoneMinutes = "22"
        break;
        case 23:
        timezoneMinutes = "23"
        break;
        case 24:
        timezoneMinutes = "24"
        break;
        case 25:
        timezoneMinutes = "25"
        break;
        case 26:
        timezoneMinutes = "26"
        break;
        case 27:
        timezoneMinutes = "27"
        break;
        case 28:
        timezoneMinutes = "28"
        break;
        case 29:
        timezoneMinutes = "29"
        break;
        case 30:
        timezoneMinutes = "30"
        break;
        case 31:
        timezoneMinutes = "31"
        break;
        case 32:
        timezoneMinutes = "32"
        break;
        case 33:
        timezoneMinutes = "33"
        break;
        case 34:
        timezoneMinutes = "34"
        break;
        case 35:
        timezoneMinutes = "35"
        break;
        case 36:
        timezoneMinutes = "36"
        break;
        case 37:
        timezoneMinutes = "37"
        break;
        case 38:
        timezoneMinutes = "38"
        break;
        case 39:
        timezoneMinutes = "39"
        break;
        case 40:
        timezoneMinutes = "40"
        break;
        case 41:
        timezoneMinutes = "41"
        break;
        case 42:
        timezoneMinutes = "42"
        break;
        case 43:
        timezoneMinutes = "43"
        break;
        case 44:
        timezoneMinutes = "44"
        break;
        case 45:
        timezoneMinutes = "45"
        break;
        case 46:
        timezoneMinutes = "46"
        break;
        case 47:
        timezoneMinutes = "47"
        break;
        case 48:
        timezoneMinutes = "48"
        break;
        case 49:
        timezoneMinutes = "49"
        break;
        case 50:
        timezoneMinutes = "50"
        break;
        case 51:
        timezoneMinutes = "51"
        break;
        case 52:
        timezoneMinutes = "52"
        break;
        case 53:
        timezoneMinutes = "53"
        break;
        case 54:
        timezoneMinutes = "54"
        break;
        case 55:
        timezoneMinutes = "55"
        break;
        case 56:
        timezoneMinutes = "56"
        break;
        case 57:
        timezoneMinutes = "57"
        break;
        case 58:
        timezoneMinutes = "58"
        break;
        case 59:
        timezoneMinutes = "59"
        break;
      }
      var timezoneError = "Error.";
      if (!args[1]) {
        message.reply(timezoneError)
      }
      else {
        var timezoneABB = args[1].toUpperCase();
        switch (args[1].toUpperCase()) {
          // If UTC is ahead of the Timezone, set timezoneAhead = false.
          case "-12": case "AOE": case "Y":
            var timezoneHours = timezoneHours - 12;
            var timezoneAhead = false;
            var timezoneExists = true;
            break;
          case "-11": case "NUT": case "SST": case "X":
            var timezoneHours = timezoneHours - 11;
            var timezoneAhead = false;
            var timezoneExists = true;
            break;
          case "-10": case "CKT": case "HAST": case "TAHT": case "W":
            var timezoneHours = timezoneHours - 10;
            var timezoneAhead = false;
            var timezoneExists = true;
            break;
          case "-09": case "V": case "AKST": case "GAMT": case "HADT":
            var timezoneHours = timezoneHours - 9;
            var timezoneAhead = false;
            var timezoneExists = true;
            break;
          case "-08": case "PST": case "AKDT": case "U":
            var timezoneHours = timezoneHours - 8;
            var timezoneAhead = false;
            var timezoneExists = true;
            break;
          case "-07": case "MST": case "PDT": case "T":
            var timezoneHours = timezoneHours - 7;
            var timezoneAhead = false;
            var timezoneExists = true;
            break;
          case "-06": case "CST": case "MDT": case "EAST": case "GALT": case "S":
            var timezoneHours = timezoneHours - 6;
            var timezoneAhead = false;
            var timezoneExists = true;
            break;
          case "-05": case "CDT": case "ACT": case "CIST": case "COT": case "EASST": case "ECT": case "EST": case "PET": case "R":
            var timezoneHours = timezoneHours - 5;
            var timezoneAhead = false;
            var timezoneExists = true;
            break;
          case "-04": case "AMT": case "AST": case "BOT": case "CDT": case "CIDST": case "CLT": case "EDT": case "FKT": case "GYT": case "PYT": case "Q": case "VET":
            var timezoneHours = timezoneHours - 4;
            var timezoneAhead = false;
            var timezoneExists = true;
            break;
          case "-03": case "PMST": case "ADT": case "AMST": case "ART": case "BRT": case "CLST": case "FKST": case "GFT": case "P": case "PYST": case "ROTT": case "SRT": case "UYT": case "WARST": case "WGT":
            var timezoneHours = timezoneHours - 3;
            var timezoneAhead = false;
            var timezoneExists = true;
            break;
          case "-02": case "O": case "BRST": case "FNT": case "GST": case "PMDT": case "UYST": case "WGST":
            var timezoneHours = timezoneHours - 2;
            var timezoneAhead = false;
            var timezoneExists = true;
            break;
          case "-01": case "AZOT": case "CVT": case "EGT": case "N":
            var timezoneHours = timezoneHours - 1;
            var timezoneAhead = false;
            var timezoneExists = true;
            break;
          // If the Timezone is ahead of UTC, set timezoneAhead = true.
          case "0": case "UTC": case "GMT":
            var timezoneExists = true;
            break;
          case "+01": case "A": case "BST": case "CET": case "IST": case "WAT": case "WEST": case "WST":
            var timezoneHours = timezoneHours + 1;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+02": case "B": case "CAT": case "CEST": case "EET": case "IST": case "SAST": case "WAST":
            var timezoneHours = timezoneHours + 2;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+03": case "C": case "ADT": case "AST": case "EAT": case "EEST": case "FET": case "IDT": case "MSK": case "SYOT": case "TRT":
            var timezoneHours = timezoneHours + 3;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+04": case "D": case "AMT": case "AZT": case "GET": case "GST": case "KUYT": case "MSD": case "MUT": case "RET": case "SAMT": case "SCT":
            var timezoneHours = timezoneHours + 4;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+05": case "E": case "AMST": case "AQTT": case "AZST": case "MAWT": case "MVT": case "ORAT": case "PKT": case "TFT": case "TJT": case "TMT": case "UZT": case "YEKT":
            var timezoneHours = timezoneHours + 5;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+06": case "F": case "ALMT": case "BTT": case "IOT": case "KGT": case "NOVT": case "OMST": case "QYZT": case "VOST": case "YEKST":
            var timezoneHours = timezoneHours + 6;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+07": case "G": case "CXT": case "DAVT": case "HOVT": case "ICT": case "KRAT": case "NOVST": case "OMSST": case "WIB":
            var timezoneHours = timezoneHours + 7;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+08": case "H": case "AWST": case "BNT": case "CAST": case "HKT": case "HOVST": case "IRKT": case "KRAST": case "MYT": case "PHT": case "SGT": case "ULAT": case "WITA":
            var timezoneHours = timezoneHours + 8;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+09": case "I": case "CHOST": case "AWDT": case "IRKST": case "JST": case "KST": case "PWT": case "TLT": case "ULAST": case "WIT": case "YAKT":
            var timezoneHours = timezoneHours + 9;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+10": case "K": case "AEST": case "CHUT": case "CHST": case "DDUT": case "PGT": case "VLAT": case "YAKST": case "YAPT":
            var timezoneHours = timezoneHours + 10;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+11": case "L": case "AEDT": case "KOST": case "LHDT": case "MAGT": case "NCT": case "NFT": case "PONT": case "SAKT": case "SBT": case "SRET": case "VLAST": case "VUT":
            var timezoneHours = timezoneHours + 11;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+12": case "M": case "ANAST": case "ANAT": case "FJT": case "GILT": case "MAGST": case "MHT": case "NRT": case "PETST": case "PETT": case "TVT": case "WAKT": case "WFT": case "NZST":
            var timezoneHours = timezoneHours + 12;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+13": case "NZDT": case "FJST": case "PHOT": case "TKT": case "TOT": case "WST":
            var timezoneHours = timezoneHours + 13;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          case "+14": case "LINT": case "TOST":
            var timezoneHours = timezoneHours + 14;
            var timezoneAhead = true;
            var timezoneExists = true;
            break;
          default:
            var timezoneExists = false;
            message.reply(timezoneError);
            return;
        }
        if (timezoneExists = true) {
            if (timezoneHours > 24) {
              var timezoneHours = timezoneHours - 24;
              var timezoneDay = Number(timezoneDay) + 1;
              var timezoneDate = Number(timezoneDate) + 1;
            }
          else {
            if (timezoneHours < 0) {
              var timezoneHours = timezoneHours + 24;
              var timezoneDay = Number(timezoneDay) - 1;
              var timezoneDate = Number(timezoneDate) - 1;
            }
          }
          switch (timezoneDay) {
            case 0:
              var timezoneDay = "Sunday"
              break;
            case 1:
              var timezoneDay = "Monday"
              break;
            case 2:
              var timezoneDay = "Tuesday"
              break;
            case 3:
              var timezoneDay = "Wednesday"
              break;
            case 4:
              var timezoneDay = "Thursday"
              break;
            case 5:
              var timezoneDay = "Friday"
              break;
            case 6:
              var timezoneDay = "Saturday"
              break;
            default:
          }
          switch (timezoneMonth) {
            case 0:
              var timezoneMonth = "January"
              break;
            case 1:
              var timezoneMonth = "February"
              break;
            case 2:
              var timezoneMonth = "March"
              break;
            case 3:
              var timezoneMonth = "April"
              break;
            case 4:
              var timezoneMonth = "May"
              break;
            case 5:
              var timezoneMonth = "June"
              break;
            case 6:
              var timezoneMonth = "July"
              break;
            case 7:
              var timezoneMonth = "August"
              break;
            case 8:
              var timezoneMonth = "September"
              break;
            case 9:
              var timezoneMonth = "October"
              break;
            case 10:
              var timezoneMonth = "November"
              break;
            case 11:
              var timezoneMonth = "December"
              break;
            default:
          }
          if (timezoneHours > 12 && timezoneHours < 24) {
            var timezoneHours = timezoneHours - 12;
            message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+"pm " + timezoneDay + " " + timezoneMonth + " " + timezoneDate + " " + timezoneABB)
          }
          else if (timezoneHours == 12) {
            message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+"pm " + timezoneDay + " " + timezoneMonth + " " + timezoneDate + " " + timezoneABB)
          }
          else if (timezoneHours == 24) {
            var timezoneHours = 12;
            message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+"am " + timezoneDay + " " + timezoneMonth + " " + timezoneDate + " " + timezoneABB)
          }
          else {
            message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+"am " + timezoneDay + " " + timezoneMonth + " " + timezoneDate + " " + timezoneABB)
          }
        }
      }
      break;
    case "post":
      if (message.author.id == "182787333169348608") {
        switch (args[1]) {
          case "message":
            var postMessage = message.content;
            postMessage = postMessage.substring(14);
            message.channel.send(postMessage);
            message.delete()
            break;
          case "file":
            if (!args[2]) {message.reply("Error. Code: switch {case: !args[2]}")}
            else {
              message.channel.send({files: [args[2]]})
            }
            message.delete()
            break;
          default:
        }
      } else {
        message.reply("Error. Code: if (lockTempus) {}")
      }
      break;
    case "translate":
      if (!args[2]) {
        message.reply("Error.")
      }
      else if (args[1] === "auto") {
        var translateContent = message.content;
        translateContent = translateContent.substring(1 + 9 + 1 + 4 + 1 + args[2].length);
        translate(translateContent, {to: args[2]}).then(res => {
          message.reply("Translated From **" + res.from.language.iso + "**: \n" + res.text);
            }).catch(err => {
            console.error(err);
          });
      }
      else {
        var translateContent = message.content;
        translateContent = translateContent.substring(1 + 9 + 1 + args[1].length + 1 + args[2].length);
        translate(translateContent, {from: args[1], to: args[2]}).then(res => {
          message.reply("Translated From **" + args[1] + "**: \n" + res.text);
        }).catch(err => {
          console.error(err);
        });
      }
    break;
    /*case "hangman":
    switch (args[1]) {
      case "setword":
        var hangmanWord = args[2].toLowerCase()
        if (hangmanWord.length == 6) {
          message.delete();
          message.channel.send("Hangman Word has been set. Start guessing with `-hangman guess [letter]`")
          //hangmanWord.charAt(0)
        } else {message.reply("Try a 6 letter word. / Error.")}
        break;
      case "guess":
        if (args[2].toLowerCase() === hangmanWord.charAt(0)) {
          message.reply("Yup")
        } else {
          message.reply("Error.")
        }
        break;
      default:

    }
    break;*/
  }
});

client.login(process.env.TOKEN)
