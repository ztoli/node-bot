const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('secretcommand')
		.setDescription('Should only be a command that you can see'),
	async execute(interaction) {
		await interaction.reply({ content: 'hiii!', ephemeral: true});
	},
};
