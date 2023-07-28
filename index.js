const fs = require('node:fs');
const path = require('node:path');
const token = "MTEzNDU2MTAzMTI1NjAzNTM0OA.GvMRC8.5SNg6CmNvJNVoFbHdpMLvaAYqAX479a9em5-Dc"; 
const {Client, Collection, Events, GatewayIntentBits} = require("discord.js");




const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);
});

client.once("ready", () => {
    console.log("The bot is online"); //message when bot is online
});

client.login(token);
