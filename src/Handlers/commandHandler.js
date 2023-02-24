'use strict';
async function loadCommands(client) {
  const { loadFiles } = require('../Functions/fileLoader');
  const ascii = require('ascii-table');
  const table = new ascii().setHeading('Commands', 'Status');
  const chalk = require('chalk');

  await client.commands.clear();

  let commandsArray = [];

  const Files = await loadFiles('Commands');

  try {
    Files.forEach((file) => {
      const command = require(file);
      client.commands.set(command.data.name, command);

      commandsArray.push(command.data.toJSON());

      table.addRow(command.data.name, 'Loaded');
    });
    client.application.commands.set(commandsArray);

  } catch (err) {
    console.error(err);
  }

  return console.log(chalk.blueBright(table.toString()));
}

module.exports = { loadCommands };
