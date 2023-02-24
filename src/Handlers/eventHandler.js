'use strict';

  async function loadEvents(client) {
  const { loadFiles } = require('../Functions/fileLoader');
  const ascii = require('ascii-table');
  const table = new ascii().setHeading('Events', 'Status');
  const chalk = require('chalk');

  await client.events.clear();

  const Files = await loadFiles('Events');

  Files.forEach((file) => {
    const event = require(file);

    try {
      const execute = (...args) => event.execute(...args, client);
      client.events.set(event.name, execute);

      if (event.rest) {
        if (event.once) client.rest.once(event.name, execute);
        else client.rest.on(event.name, execute);
      } else {
        if (event.once) client.once(event.name, execute);
        else client.on(event.name, execute);
      }
    } catch (err) {
      console.error(err);
    }
    table.addRow(event.name, 'Loaded');
  });

  return console.log(chalk.blueBright(table.toString()));
}

module.exports = { loadEvents };
