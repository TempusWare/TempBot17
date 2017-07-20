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
  .setFooter("beep boop REEEEEEEEEEEEEEEEEEEEEEE")
  .setTimestamp()

client.on('ready', () => {
  console.log('Bot Started.');
  client.user.setGame('Ping Pong')
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/);
  if(commandIs('ping', message) || commandIs('pong', message)){
    message.reply("Pong! :ping_pong:");
    console.log(`Pinged ${message.author}.`)
  }
/*  if(commandIs('say', message)){
    message.channel.send('From ' + message.author.username + ': ' + args[1])
  }*/
  if(commandIs('count', message)){
    if(message.content.length < 56){
      message.reply("It fits.")
    } else {
      message.reply("Too long, try shortening it or breaking it into multiple lines.")
    }
  }
  if(commandIs('avatar', message)){
    message.reply(message.author.avatarURL)
  }
  if(commandIs('help', message)){
    message.author.sendMessage({embed});
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
//  if(commandIs('wrapup', message)){
//    let actorID = "337538000374333451";
//    let actorCast = message.guild.roles.get(actorID).members;
//    console.log(`Got ${actorCast.size} members with that role.`);
//    actorMember.removeRole(actorRole);
//  }
  if(commandIs("purge", message)){
    if(hasRole(message.member, "Admin")){
      message.channel.bulkDelete(100);
    } else {
      message.reply('You do not have required permissions to use this command.')
    }
  }
});

client.login(process.env.TOKEN)
