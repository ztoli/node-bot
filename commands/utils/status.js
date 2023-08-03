const {SlashCommandbBuilder, EmbedBuilder} = require('discord.js');

module.exports={
	data: new SlashCommandbBuilder()
		.setName('status')
		.setDescription('sets the bot status')
		.addStringOption(option => optoin.setName('status').setDescription('Status of bots presence.').setRequired(true))
		.addStringOption(option => optoin.setName('type').setDescription("type of status").addChoices({ name: 'playing', value : `${4}`})),
	async execute (interaction, client) {
		const {options} = interaction;
		const status = options.getString('status');
		const type = options.getString('type');

		client.user.setActivity({
			name:



			// add some embedbuilder bullshit, idk how to make it communicate with the player..
		})
	}
}
