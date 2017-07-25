const Discord = require('discord.js');
const client = new Discord.Client();

function commandIs(str, msg){
  return msg.content.toLowerCase().startsWith("-" + str);
}

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

const embed = new Discord.RichEmbed()
  .setAuthor("TempBot", "http://i.imgur.com/JOUdoSf.png")
  .setTitle("List of available commands:")
  .setColor(0x78F7FE)
  .setThumbnail("http://i.imgur.com/IjgeTrM.png")
  .addField("-avatar", "Replies with your Discord avatar in case you lost it. Usage: `-avatar`")
  .addField("-count", "Replies with if your message is over 48 characters. Usage: `-count [message]`")
  .addField("-cast", "Adds a 'Filming' role to the mentioned user. Usage: `-cast [@username]` (Disabled Currently)")
  .addField("-wrapup", "Removes the 'Filming' role from the mentioned user. Usage: `-wrapup [@username]` (Disabled Currently)")
  .addField("-purge", "Deletes the past 100 messages. Cannot delete messages over 2 weeks old. Usage: `-purge`")
  .addField("-timezone", "Replies with the current time in a timezone. Usage: `-timezone [timezone abbreviations]` (Work in Progress)")
  .setFooter("beep boop REEEEEEEEEEEEEEEEEEEEEEE")
  .setTimestamp()

client.on('ready', () => {
  console.log('Bot Started.');
  client.user.setGame('Ping Pong');
});

client.on('message', message => {
  let args = message.content.split(" ").slice(0)
  if(commandIs('ping', message) || commandIs('pong', message)){
    message.reply("Pong! :ping_pong:");
    console.log(`Pinged ${message.author}.`)
  }
/*  if(commandIs('say', message)){
    message.channel.send('From ' + message.author.username + ': ' + args[1])
  }*/
  if(commandIs('count', message)){
    var commandCount = message.content.length - 7;
    if(commandCount < 48){
      message.reply("It fits. *(Character Count: `" + commandCount + "`)*")
    } else {
      message.reply("Too long, try shortening it or breaking it into multiple lines. *(Character Count: `" + commandCount + "`)*")
    }
  }
  if(commandIs('avatar', message)){
    message.reply(message.author.avatarURL)
  }
  if(commandIs('help', message)){
    message.author.send({embed});
    message.reply("A list of my commands has been sent to your Private Messages.")
  }
/*  if(commandIs('cast', message)){
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
  if(commandIs("purge", message)){
    if(hasRole(message.member, "Admin") || (hasRole(message.member, "admin"))){
      message.channel.bulkDelete(100);
      message.channel.send("Past 100 messages have been deleted.")
    } else {
      message.reply('You do not have required permissions to use this command.')
    }
  }
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
  if(commandIs("timezone", message)){
    var timezoneGet = new Date();
    timezoneHours = timezoneGet.getUTCHours();
    timezoneMinutes = timezoneGet.getUTCMinutes();
    if(timezoneHours < 24){
      if (args.length === 1){
        message.channel.send("Error. List of timezones available: `UTC | AEST | BST | PST | EST`")
      } else if(args[1] === "UTC") {
        message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+" UTC")
      } else if (args[1] === "AEST") {
        var timezoneHours = timezoneHours + 10;
        message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+" AEST")
      } else if (args[1] === "BST") {
        var timezoneHours = timezoneHours + 1;
        message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+" BST")
      } else if (args[1] === "EST") {
        var timezoneHours = timezoneHours - 4;
        message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+" EST")
      } else if (args[1] === "NZST") {
        var timezoneHours = timezoneHours + 12;
        message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+" NZST")
      } else if (args[1] === "PST") {
        var timezoneHours = timezoneHours - 7;
        message.channel.send("It is "+timezoneHours+":"+timezoneMinutes+" PST")
      } else {
        message.channel.send("Error. List of timezones available: `UTC | AEST | BST | PST | EST`")
      }
    }
  }
});

client.login(process.env.TOKEN)
