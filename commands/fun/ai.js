const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {Configuration, OpenAIApi} = require('openai');

const configuration = new Configuration({
	apiKey: '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'
});
const openai = new OpenAIApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chatgpt')
		.setDescription('talk with chatgpt!!')
		.addStringOption(option => option.setName('question').setDescription(`This is the question for chatgpt`).setRequired(true))
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.deferReply();

		const question = interaction.options.getString('question');

		try {
			const res = await openai.createCompletion(
				{
					model: "gpt-4",
					temperature: 0.3,
					prompt: question,
					max_tokens : 1024,
				})

			const embed = new EmbedBuilder()
				.setColor('Blue')
				.setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

			await interaction.editReply({embeds: [embed]});
		} catch (e) {
			return await interaction.editReply({content: `Request failed with status code **${e.response.status}**`})
		}

	}
}


