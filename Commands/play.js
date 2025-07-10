const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "play",
  async execute(client, message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.reply("❌ You must join a voice channel first!");

    const song = args.filter(arg => !arg.startsWith("--")).join(" ");
    if (!song)
      return message.reply("❌ You must provide a song name or URL!");

    const filters = [];
    if (args.includes("--lofi")) filters.push("lofi");
    if (args.includes("--nightcore")) filters.push("nightcore");

    try {
      if (filters.length) {
        client.distube.setFilter(message.guild.id, filters);
      } else {
        client.distube.setFilter(message.guild.id, []);
      }

      await client.distube.play(voiceChannel, song, {
        textChannel: message.channel,
        member: message.member,
      });

      const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle("🎵 Searching...")
        .setDescription(`🔎 \`${song}\``)
        .setFooter({ text: "LofiX Music" });

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply("❌ Failed to play the song.");
    }
  },
};
