const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, args, member) => {

  let user = message.mentions.users.first() || message.author;
  const { createCanvas, loadImage } = require("canvas");
  const canvas = Canvas.createCanvas(680, 677);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.glitch.com/5d94d2b3-55ae-4001-86e0-104c8c5e4005%2Fsimp.png?v=1588383485326"
  );
  const { body: buffer } = await snekfetch.get(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
  const avatar = await Canvas.loadImage(buffer);
  await ctx.drawImage(avatar, 88, 98, 330, 330);
  await ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  message.channel.send("caught you lacking, you crap idiot", { files: [canvas.toBuffer()] });
};

module.exports.help = {
  name: "simp"
}