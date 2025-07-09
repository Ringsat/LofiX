const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();
const prefix = "!";

// Load all command files
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

// Bot ready
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  client.user.setActivity(`${prefix}play`, { type: 2 });
});

// Command handler (prefix and non-prefix)
client.on("messageCreate", async message => {
  if (message.author.bot || !message.guild) return;

  let args, cmd;
  if (message.content.startsWith(prefix)) {
    args = message.content.slice(prefix.length).trim().split(/ +/);
    cmd = args.shift().toLowerCase();
  } else {
    args = message.content.trim().split(/ +/);
    cmd = args.shift().toLowerCase();
  }

  const command = client.commands.get(cmd);
  if (!command) return;

  try {
    await command.execute(client, message, args);
  } catch (err) {
    console.error(err);
    message.reply("❌ Command error.");
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
