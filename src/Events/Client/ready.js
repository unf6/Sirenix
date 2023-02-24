'use strict';
const { ActivityType } = require('discord.js');
const { connect, connection, set } = require('mongoose');
const { loadCommands } = require('../../Handlers/commandHandler');
const { Client } = require('discord.js');
const { green } = require('chalk');

module.exports = {
  name: 'ready',
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    // Status changer
    (async () => {
      client.pickPresence = async () => {
        const options = [
          {
            type: ActivityType.Watching,
            text: `${client.guilds.cache.size} servers :(`,
            status: 'online',
          },
          {
            type: ActivityType.Playing,
            text: `Sirenix!`,
            status: 'online',
          },
          {
            type: ActivityType.Watching,
            text: `${client.commands.size} commands`,
            status: 'online',
          },
        ];

        const option = Math.floor(Math.random() * options.length);

        client.user.setPresence({
          activities: [
            {
              name: options[option].text,
              type: options[option].type,
            },
          ],
          status: options[option].status,
        });
      };

      setInterval(client.pickPresence, 1000 * 10);
    })().catch(console.error);

    const status = ['disconnected', 'connected', 'connecting', 'disconnecting'];

    set('strictQuery', true);
    await connect(client.config.mongoUri).then(() => {
      setTimeout(() => {
        console.log(
          green(`[Database] MongoDB is ${status[connection.readyState]}`)
        );
      }, 1000 * 1);
    });

    await loadCommands(client);
  },
};
