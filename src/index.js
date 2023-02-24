'use strict';
const {
  Client,
  Partials,
  GatewayIntentBits,
  Collection,
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
  failIfNotExists: false,
  allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true },
});

// Loads the commands, events and log's in the client
(async function () {
  const { loadEvents } = require('./Handlers/eventHandler');
  
  client.config = require('../config.js');
  
  client.events = new Collection();
  client.commands = new Collection();
  client.cooldowns = new Collection();

  await loadEvents(client);

})().catch(console.error);

client.login(client.config.token || process.env.TOKEN);
