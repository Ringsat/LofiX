module.exports = {
  name: "play",
  async execute(client, message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply("❌ Join a voice channel first!");

    const song = args.join(" ");
    if (!song) return message.reply("❌ You must provide a song name or URL!");

    client.distube.play(voiceChannel, song, {
      textChannel: message.channel,
      member: message.member
    });
  }
};
