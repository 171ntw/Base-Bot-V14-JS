import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import dotenv from 'dotenv';
import slash from './settings/clients/commandSlash.js';
import event from './settings/clients/EventManager.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Reaction,
        Partials.Message,
        Partials.User
    ]
});

dotenv.config();

export default client;

slash.run(client);
event.run(client);

client.slashCommands = new Collection();

client.login(process.env.token);