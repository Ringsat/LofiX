module.exports = {
  name: "stop",
  async execute(client, message) {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.reply("❌ There's nothing playing.");
    
    queue.stop();
    message.reply("🛑 Music has been stopped and the queue has been cleared.");
  },
};
