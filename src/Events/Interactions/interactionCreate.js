'use strict';
const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  Client,
} = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription('This command is outdated'),
        ],
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== '755566952449310842')
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription('This command is only available to the developer.'),
        ],
        ephemeral: true,
      });

    try {
      command.execute(interaction, client);
    } catch (err) {
      console.error(err);
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setDescription(
              'Something went wrong while executing this command...'
            ),
        ],
        ephemeral: true,
      });
    }
    
  },
};
