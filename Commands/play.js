module.exports = {
  name: 'play',
  async execute(client, message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('❌ Join a voice channel first!');

    const query = args.join(' ');
    if (!query) return message.reply('❌ Please provide a song name or link.');

    try {
      client.distube.play(voiceChannel, query, {
        textChannel: message.channel,
        member: message.member,
      });
    } catch (error) {
      console.error(error);
      message.reply('⚠️ Error playing music.');
    }
  }
};
