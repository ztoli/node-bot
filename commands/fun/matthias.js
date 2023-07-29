const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mathijs')
		.setDescription('Corrects the name to use the REAL one.'),
	execute: async ({ interaction }) => {
		// Fuck useless comments
		await interaction.reply(`In fact, it is written MATTHIAS`);
	},
};
