const { SlashCommandBuilder } = require('@discordjs/builders');
const { useQueue } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses the current song'),
	execute: async (interaction) => {
		// Get the queue for the server
		const queue = useQueue(interaction.guild.id);

		// Check if the queue is empty
		if (!queue) {
			await interaction.reply('There are no songs in the queue');
			return;
		}

		// Pause the current song
		queue.node.setPaused(true);

		await interaction.reply('Player has been paused.');
	},
};
