const { channel_id, roles } = require("../../config.json");

const {
  Client,
  Events,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const guildCurrentRoles = roles;

function buttons(client) {
  client.once(Events.ClientReady, async (c) => {
    try {
      const channel = await client.channels.cache.get(channel_id);
      if (!channel) {
        return;
      }

      const row = new ActionRowBuilder();
      guildCurrentRoles.forEach((role) => {
        row.components.push(
          new ButtonBuilder()
            .setCustomId(role.id)
            .setLabel(role.label)
            .setStyle(role.style)
        );
      });

      await channel.send({
        content: "Claim your role!",
        components: [row],
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = { buttons, guildCurrentRoles };
