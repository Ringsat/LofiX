module.exports = {
  name: "pause",
  async execute(client, message) {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.reply("❌ There's nothing playing.");
    if (queue.paused) return message.reply("⏸️ The music is already paused.");

    queue.pause();
    message.reply("⏸️ Music has been paused.");
  },
};
