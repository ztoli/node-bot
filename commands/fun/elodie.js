const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('elodie')
		.setDescription('revenge for the other retarded command'),
	async execute(interaction) {
		// Fuck useless comments
		await interaction.reply(`mathijs' slave`);
	},
};
