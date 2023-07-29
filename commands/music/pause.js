const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses the current song'),
	execute: async (interaction) => {
		const client = interaction.client;
		// Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId);

		// Check if the queue is empty
		if (!queue) {
			await interaction.reply('There are no songs in the queue');
			return;
		}

		// Pause the current song
		queue.setPaused(true);

		await interaction.reply('Player has been paused.');
	},
};
