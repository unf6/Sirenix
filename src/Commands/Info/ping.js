const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription(`Replies with the API's Latency + Client Ping.`)
    .setDMPermission(false),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {

    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newEmbed = new EmbedBuilder()
      .setColor('Random')
      .setDescription(
        `API Latency: ${client.ws.ping}ms\nClient Ping: ${
          message.createdTimestamp - interaction.createdTimestamp
        }ms`
      );

    await interaction.editReply({
      embeds: [newEmbed],
      ephemeral: false,
    });
  },
};
