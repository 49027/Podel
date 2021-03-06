const Discord = require("discord.js");
let config = require("../config.json"),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  let podelemoji = bot.emojis.cache.find(emoji => emoji.name === `podel`);

  if (message.member.voice.channel) {
    
  let isPlaying = bot.player.isPlaying(message.guild.id);
    
    if (!isPlaying) {
      let track = await bot.player.play(message.member.voice.channel, args.join(" "));
       track = track.song;
      
      let embed = new Discord.MessageEmbed()
          .setTitle(
            "#" + message.member.voice.channel.name + " | " + message.author.tag
          )
          .addField(`Now Playing ${podelemoji}:`, `${track.name}`)
          .addField(`Duration`, `${track.duration}`)
          .addField(
            "Listen to this track here:",
            `[Open Youtube](${track.url})`,
            true
          )
          .setThumbnail(track.thumbnail)
          .setColor(colour)
          .setTimestamp()
          .setFooter(
            "Podel, coded by the government of georgia",
            bot.user.displayAvatarURL()
          );
        
        await message.channel.send(embed);
    } else {
      message.channel.send("fuck off, use `p!add` to add songs to the queue")
    }
  } else {
    message.reply("you need to join a voice channel first.");
  } 
};

module.exports.help = {
  name: "play",
  type: "user"
}
