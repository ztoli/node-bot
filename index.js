const token = "MTEzNDU2MTAzMTI1NjAzNTM0OA.GvMRC8.5SNg6CmNvJNVoFbHdpMLvaAYqAX479a9em5-Dc"; 
const {Client, Intents, GatewayIntentBits} = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.on("ready", () =>{
    console.log("The bot is online"); //message when bot is online
});
client.on("message", (message) => {
    if (message.content.substring(0, 1) === "!") {
        message.channel.send("idiot"); //reply if message has "!" as first character
    }
});
client.login(token);
