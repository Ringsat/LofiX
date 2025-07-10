module.exports = {
  name: "skip",
  async execute(client, message) {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.reply("❌ There's nothing to skip.");
    try {
      await queue.skip();
      message.reply("⏭️ Skipped to the next song.");
    } catch (err) {
      console.error(err);
      message.reply("❌ Failed to skip.");
    }
  },
};
