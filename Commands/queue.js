module.exports = {
  name: "queue",
  async execute(client, message) {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.reply("❌ The queue is empty.");

    const q = queue.songs
      .map((song, i) => `${i === 0 ? "▶️" : `${i}.`} ${song.name} \`${song.formattedDuration}\``)
      .join("\n");

    message.reply(`📜 **Current Queue:**\n${q}`);
  },
};
