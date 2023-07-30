const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const superagent = require('superagent');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('generate')
		.setDescription('Generate image using AI')
		.addStringOption(option => option.setName('prompt').setDescription('Prompt for generating AI image').setRequired(true)),
	async execute(interaction) {
		await interaction.reply({ content: `Loading image... This can take up to 5 minutes because bullshit AI.` });

		const { options } = interaction;

		const prompt = options.getString('prompt');

		const image = await superagent.post(`https://backend.craiyon.com/generate`)
			.send({
				prompt: `${prompt}`,
			});

		const buffer = Buffer.from(image.body.images[0], 'base64');
		const attachment = new AttachmentBuilder(buffer, { name: 'image.png' });

		const embed = new EmbedBuilder()
			.setColor('Blurple')
			.setImage(`attachment://image.png`)
			.setTitle(`Image based on: \`${prompt}\``)
			.setTimestamp();

		await interaction.editReply({ content: ``, embeds: [embed], files: [attachment] });
	},
};