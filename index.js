const token = <"YOUR_SAVED_BOT_TOKEN">; 
const {Client, Intents} = require("discord.js");
const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES 
    ]
});
client.on("ready", () =>{
    console.log("The bot is online"); //message when bot is online
});
client.on("message", (message) => {
    if (message.content.substring(0, 1) === "!") {
        message.channel.send("idiot"); //reply if message has "!" as first character
    }
});
client.login(token);
