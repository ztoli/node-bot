const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('sets the bot status')
		.addStringOption(option => option.setName('status').setDescription('Status of bots presence.').setRequired(true))
		.addStringOption(option => option.setName('type').setDescription('type of status').addChoices({
			name: 'playing',
			value: `${4}`,
		})),
	async execute(interaction) {
		const { options } = interaction;
		const status = options.getString('status');
		const type = options.getString('type');

		interaction.client.user.setActivity({
			name: status,
			type: type - 1,
			url: `https://bsdnix.nl/`,
		});
		const embed = new EmbedBuilder()
			.setColor('DarkVividPink')
			.setDescription('Bot now has the correct status.');

		await interaction.reply({ embeds: [embed] });


	},
};
