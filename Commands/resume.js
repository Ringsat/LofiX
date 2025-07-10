module.exports = {
  name: "resume",
  async execute(client, message) {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.reply("❌ There's nothing playing.");
    if (!queue.paused) return message.reply("▶️ The music is already playing.");

    queue.resume();
    message.reply("▶️ Music has been resumed.");
  },
};
