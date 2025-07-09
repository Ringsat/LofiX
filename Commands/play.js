module.exports = {
  name: 'play',
  async execute(client, message, args) {
    const { DisTube } = require('distube');
    const distube = new DisTube(client, { emitNewSongOnly: true });

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply("❌ Join a voice channel first!");

    const song = args.join(" ");
    if (!song) return message.reply("❌ Type a song name or YouTube link!");

    distube.play(voiceChannel, song, {
      textChannel: message.channel,
      member: message.member
    });
  }
};
