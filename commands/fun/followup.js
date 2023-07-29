const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('retard')
		.setDescription('elo is very pretty'),
	async execute(interaction) {
		await interaction.reply('no you are the retard !!');
		await interaction.followUp('also, why am i the retard ? you are typing node ?')
	},
};
