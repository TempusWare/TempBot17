const Discord = require('discord.js');
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
.addField("-avatar", "Replies with your Discord avatar in case you lost it. Usage: `-avatar`")
.addField("-count", "Replies with if your message is over 48 characters. Usage: `-count [message]`")
.addField("-serverinfo", "Get the stats of the current server. Usage: `-serverinfo`")
.addField("-purge", "Deletes the past 100 messages. Cannot delete messages over 2 weeks old. Requires `Admin` Role. Usage: `-purge`")
.addField("-timezone", "Replies with the current time in a timezone. Usage: `-timezone [timezone abbreviation]` (W.I.P)")
.addField("-8ball", "Responds with a magical... reponse. Usage: `-8ball [question]`")
.addField("-calculate", "Adds, Subtracts, Multiplies and Divides with up to 3 numbers. Usage: `-calculate [number] [symbol] [number]`")
//.addField("-cast", "Adds a 'Filming' role to the mentioned user. Usage: `-cast [@username]` (Disabled Currently)")
//.addField("-wrapup", "Removes the 'Filming' role from the mentioned user. Usage: `-wrapup [@username]` (Disabled Currently)")
.setFooter("beep boop REEEEEEE")
.setTimestamp()

client.on('ready', () => {
  console.log('Bot Started.');
  client.user.setGame("-help");
});

client.on('guildMemberAdd', member => {
  const channelGeneral = member.guild.channels.find("name", "general");
  if (!channelGeneral) return;
  channelGeneral.send(`Welcome ${member} to the server!`)
});

client.on('guildMemberRemove', member => {
  const channelGeneral = member.guild.channels.find("name", "general");
  if (!channelGeneral) return;
  channelGeneral.send(`Farewell ${member}.`)
});

client.on('message', message => {
  if (message.author.equals(client.user)) return;

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
      timezoneHours = timezoneGet.getUTCHours();
      timezoneMinutes = timezoneGet.getUTCMinutes();
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
      var timezoneError = "Error. List of timezones available:\n`UTC | AEST | BST | EST | MDT | MST | PST | GMT`";
        if (!args[1]) {
          message.channel.send(timezoneError)
        } else {
        switch (args[1].toUpperCase()) {
          // If the Timezone is ahead of UTC, set timezoneAhead = 1.
          case "UTC":
            break;
          case "GMT":
            break;
          case "AEST":
            var timezoneHours = timezoneHours + 10;
            var timezoneAhead = 1;
            break;
          case "BST":
            var timezoneHours = timezoneHours + 1;
            var timezoneAhead = 1;
            break;
          // If UTC is ahead of the Timezone, set timezoneAhead = 0.
          case "CST":
            var timezoneHours = timezoneHours - 5;
            var timezoneAhead = 0;
            break;
          case "EST":
            var timezoneHours = timezoneHours - 4;
            var timezoneAhead = 0;
            break;
          case "MDT":
            var timezoneHours = timezoneHours - 6;
            var timezoneAhead = 0;
            break;
          case "MST":
            var timezoneHours = timezoneHours - 7;
            var timezoneAhead = 0;
            break;
          case "PST":
            var timezoneHours = timezoneHours - 7;
            var timezoneAhead = 0;
            break;
          default: message.channel.send(timezoneError)
          }
          if (timezoneAhead == 1) {
            if (timezoneHours > 24) {
              var timezoneHours = timezoneHours - 24;
            }
          } else {
            if (timezoneHours < 0) {
              var timezoneHours = timezoneHours + 24;
            }
          }
          timezoneABB = args[1].toUpperCase();
          if (timezoneHours > 12) {
            var timezoneHours = timezoneHours - 12;
            message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+"pm " + timezoneABB)
          } else if (timezoneHours == 12) {
            message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+"pm " + timezoneABB)
          } else {
            message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+"am " + timezoneABB)
          }
        }
        break;
      case "calculate": case "calc":
        if (!args[4]) {
          var calculateNumberOne = args[1];
          var calculateNumberTwo = args[3];
          switch (args[2]) {
            case "+": case "add": case "plus":
              var calculateTotal = Number(calculateNumberOne) + Number(calculateNumberTwo)
              break;
            case "-": case "take": case "minus": case "subtract":
              var calculateTotal = Number(calculateNumberOne) - Number(calculateNumberTwo)
              break;
            case "x": case "*": case "times":
              var calculateTotal = Number(calculateNumberOne) * Number(calculateNumberTwo)
              break;
            case "/": case "divide": case "divided by":
              var calculateTotal = Number(calculateNumberOne) / Number(calculateNumberTwo)
              break;
            case "%":
              var calculateTotal = Number(calculateNumberOne) % Number(calculateNumberTwo)
              break;
            default: message.channel.send("Error.");
          }
        }
        else if (!args[6]) {
          var calculateNumberOne = args[1];
          var calculateNumberTwo = args[3];
          var calculateNumberThree = args[5];
          switch (args[2]) {
            case "+": case "add": case "plus":
              var calculateTotal = Number(calculateNumberOne) + Number(calculateNumberTwo)
              break;
            case "-": case "take": case "minus": case "subtract":
              var calculateTotal = Number(calculateNumberOne) - Number(calculateNumberTwo)
              break;
            case "x": case "*": case "times":
              var calculateTotal = Number(calculateNumberOne) * Number(calculateNumberTwo)
              break;
            case "/": case "divide": case "divided by":
              var calculateTotal = Number(calculateNumberOne) / Number(calculateNumberTwo)
              break;
            case "%":
              var calculateTotal = Number(calculateNumberOne) % Number(calculateNumberTwo)
              break;
            default: message.channel.send("Error.");
          }
          switch (args[4]) {
            case "+": case "add": case "plus":
              var calculateTotal = Number(calculateTotal) + Number(calculateNumberThree)
              break;
            case "-": case "take": case "minus": case "subtract":
              var calculateTotal = Number(calculateTotal) - Number(calculateNumberThree)
              break;
            case "x": case "*": case "times":
              var calculateTotal = Number(calculateTotal) * Number(calculateNumberThree)
              break;
            case "/": case "divide": case "divided by":
              var calculateTotal = Number(calculateTotal) / Number(calculateNumberThree)
              break;
            case "%":
              var calculateTotal = Number(calculateTotal) % Number(calculateNumberThree)
              break;
            default: message.channel.send("Error.");
          }
        }
        else {
          message.reply("Error.")
        }
        message.reply(calculateTotal)
        break;
    /*case "task":
      const channelTasks = member.guild.channels.find("name", "tasks");
      if (!channelTasks) return;
      if (args[3]) {
        switch (args[2].toUpperCase()) {
          case WRITER:
            channelTasks.send("**" + args[1] + "**" + "\nWriter: " + args[2])
          break;
        }
      } else {
        message.reply("Error.")
      }
    break;*/
  }
  /*if(commandIs('cast', message)){
    let actorMember = message.guild.member(message.mentions.users.first());
    let actorRole = message.guild.roles.find("name", "Filming");
    actorMember.addRole(actorRole);
    message.channel.sendMessage(message.guild.member(message.mentions.users.first()) + " has been cast.");
    console.log(`Added ${message.guild.member(message.mentions.users.first())} to cast.`);
  }
  if(commandIs('wrapup', message)){
    let actorMember = message.guild.member(message.mentions.users.first());
    let actorRole = message.guild.roles.find("name", "Filming");
    actorMember.removeRole(actorRole);
    message.channel.sendMessage(message.guild.member(message.mentions.users.first()) + " has wrapped up.");
    console.log(`Removed ${message.guild.member(message.mentions.users.first())} from cast.`);
  }*/
  /*if(commandIs("settask", message)){
    if(args.length === 1){
      message.channel.send("You did not define an argument. Usage: `-updatetask [Title] [Role] [Username]`")
    } else if(args.length === 4 && args[2] === "Writer"){
      message.channel.send(args[1] + " | " + args[2] + ": " + args[3])
    } else if(args.length === 4 && args[2] === "Filmer"){
      message.channel.send(args[1] + " | " + args[2] + ": " + args[3])
    } else {
      message.channel.send("There was an error.")
    }
  }
  if(commandIs("updatetask", message)){
    if(args.length === 1){
      message.channel.sendMessage("You did not define an argument. Usage: `-updatetask [Title] [Role] [Username]`")
    } else if(args.length === 4){
      let taskInfo = message.content.find("includes", args[1]);
      message.channel.sendMessage("Found message.")
    } else {
      message.channel.sendMessage("Denied.")
    }
  }*/
});



client.login(process.env.TOKEN)
