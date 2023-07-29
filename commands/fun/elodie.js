const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('elodie')
		.setDescription('revenge for the other retarded command'),
	execute: async ({ interaction }) => {
		// Fuck useless comments
		await interaction.reply(`mathijs' slave`);
	},
};
