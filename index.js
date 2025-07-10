require("dotenv").config();
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();
const prefix = "!";

// Load commands
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// DisTube setup
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnEmpty: true,
  plugins: [new YtDlpPlugin()]
});

// DisTube event listeners
client.distube
  .on("playSong", (queue, song) => {
    queue.textChannel.send(`🎶 Now playing: **${song.name}**`);
  })
  .on("addSong", (queue, song) => {
    queue.textChannel.send(`➕ Added: **${song.name}** to the queue.`);
  })
  .on("finish", queue => {
    queue.textChannel.send("✅ Queue finished. Leaving voice channel...");
  })
  .on("empty", queue => {
    queue.textChannel.send("📭 Voice channel is empty. Leaving...");
  })
  .on("error", (channel, error) => {
    console.error(error);
    channel.send("❌ An error occurred while playing music.");
  });

// Message listener
client.on("messageCreate", async message => {
  if (message.author.bot || !message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  let args, cmd;
  if (message.content.startsWith(prefix)) {
    args = message.content.slice(prefix.length).trim().split(/ +/);
    cmd = args.shift().toLowerCase();
  }

  const command = client.commands.get(cmd);
  if (!command) return;

  try {
    await command.execute(client, message, args);
  } catch (err) {
    console.error(err);
    message.reply("❌ There was an error executing that command.");
  }
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  client.user.setActivity(`${prefix}play`, { type: 2 });
});

client.login(process.env.TOKEN)const
