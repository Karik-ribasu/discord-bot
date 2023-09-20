const { Client, Events, GatewayIntentBits } = require("discord.js");
const { guildCurrentRoles } = require("../components/button");

function getRoleSystem(client) {
  client.on(Events.InteractionCreate, async (interaction) => {
    try {
      if (!interaction.isButton) return;

      await interaction.deferReply({ ephemeral: true });

      const member = interaction.member;
      const role = interaction.guild.roles.cache.get(interaction.customId);

      if (!role) {
        interaction.editReply({
          content: "Sorry, i couldn't find that role",
        });
        return;
      }

      const hasRole = member.roles.cache.has(role.id);

      if (hasRole) {
        await member.roles.remove(role.id);
        await interaction.editReply(`The role ${role} has been remove.`);
        return;
      } else {
        await guildCurrentRoles.forEach(async (role) => {
          await member.roles.remove(role.id);
        });
      }
      await member.roles.add(role.id);
      await interaction.editReply(`The role ${role} has been added.`);
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  });
}

module.exports = { getRoleSystem };
