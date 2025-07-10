const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "play",
  description: "Plays a song from YouTube.",
  async execute(client, message, args) {
    if (!message.member.voice.channel) {
      return message.reply("❌ You need to join a voice channel first.");
    }

    const query = args.join(" ");
    if (!query) {
      return message.reply("❌ Please provide a song name or link.");
    }

    try {
      client.distube.play(message.member.voice.channel, query, {
        textChannel: message.channel,
        member: message.member
      });

      const embed = new EmbedBuilder()
        .setTitle("🎶 Now Playing")
        .setDescription(`▶️ **${query}**`)
        .setColor("#2F3136");

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("pause").setLabel("⏸ Pause").setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("resume").setLabel("▶️ Resume").setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("skip").setLabel("⏭ Skip").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("stop").setLabel("⏹ Stop").setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId("queue").setLabel("📄 Queue").setStyle(ButtonStyle.Secondary)
      );

      await message.channel.send({ embeds: [embed], components: [row] });
    } catch (err) {
      console.error(err);
      message.reply("❌ Failed to play the song.");
    }
  }
};
