const {SlashCommandBuilder} = require("@discordjs/buiders");
const { MessageEmbed} = require("discord.js");
const { QueryType } = require(discord-player);

module.exports = {
	data: new SlashCommandBuilder()
	.setname("play")
	.setDescription("plays a song")
	.addSubcommand(subcommand => {
		subcommand
		   .setName("search")
		   .setDescription("searches for a song")
		   .addStringOption(option => {
			   option
			      .setName("searchterms")
			      .setDescription("search keywords")
			      .setRequired(true);
		   })
	})
	.addSubcommand(subcommand => { 
		subcommand
		    .setname("playlist")
		    .setDescription("plays playlist from yt")
		    .addStringOption(option => {
			    option
			        .setName("url)
			        .setDescription("playlist url")
			        .setRequired(true);
		    })
	})
	.addSubcommand(subcommand => {
		subcommand
		    .setName("song")
		    .setDescription("plays a song from yt")
		    .addStringOption(option => {
			    option
			        .setName("url")
			        .setDescription("url of the song")
			        .setRequired(true);
		    })
	}),
	execute: async ({client, interaction }) => {
		if (!interaction.member.voice.channel)
		{
			await interaction.reply("you must be in a voice channel fucking idiot");
			return;
		}
		const queue = await client.player.createQueue(interaction.guild);
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new MessageEmbed();
		if(interaction.options.getSubcommand() === "song")
		{
			let url = interaction.options.getString("url");

			const restult await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_VIDEO,
			});
		if (result.tracks.length === 0)
			{
				await interaction.reply("no results found");
				return
			}
			const song =result.tracks[0]
			await queue.addTrack(song);

			embed
				.setDescription(`Added **[${song.title}](${song.url}]** to the queue.`)
				.setThumbnail(song.thumbnail)
				.setFooter({text: `duration: ${song.duration}`});
		}
	}
}

				
