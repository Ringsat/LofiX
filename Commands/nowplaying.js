module.exports = {
  name: "nowplaying",
  async execute(client, message) {
    const queue = client.distube.getQueue(message);
    if (!queue || !queue.playing) return message.reply("❌ Nothing is currently playing.");
    
    const song = queue.songs[0];
    message.reply(`🎵 Now Playing: **${song.name}**\n🕒 Duration: \`${song.formattedDuration}\``);
  },
};
