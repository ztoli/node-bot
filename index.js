const token = "MTEzNDU2MTAzMTI1NjAzNTM0OA.GvMRC8.5SNg6CmNvJNVoFbHdpMLvaAYqAX479a9em5-Dc"; 
const {Client, Intents, GatewayIntentBits} = require("discord.js");




const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.once("ready", () => {
    console.log("The bot is online"); //message when bot is online
});

client.login(token);
