const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('shows first 10 songs in the queue'),

	execute: async (interaction) => {
		const queue = useQueue(interaction.guild.id);
		const tracks = queue.tracks.toArray();
		const currentSong = queue.currentTrack;

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setDescription(`**Currently Playing**\n` +
						(currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>` : 'None') +
						`\n\n**Queue**\n${tracks}`,
					)
					.setThumbnail(currentSong.setThumbnail),
			],
		});
	},
};
