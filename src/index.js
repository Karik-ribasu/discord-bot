const { Client, Events, GatewayIntentBits } = require("discord.js");
const { bot_token } = require("../config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.on(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

const { getRoleSystem } = require("./functions/get-role.js");
const { buttons } = require("./components/button.js");
getRoleSystem(client);
buttons(client);

client.login(bot_token);
