const {SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addemoji')
		.setDescription('Adds self-uploaded emoji to the server.')
		.addAttachmentOption(option => option.setName('emoji').setDescription("emoji you want to add to the server").setRequired(true))
		.addStringOption(option => option.setName('name').setDescription("the name of the emoji").setRequired(true)),

	async execute(interaction) {
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) return await interaction.reply({content: `you dont have permission to add emojis`});

		const upload = interaction.options.getAttachment('emoji');
		const name = interaction.options.getString('name');

		await interaction.reply({content: ` loading your emoji.. `});

		const emoji = await interaction.guild.emojis.create({
			attachment: `${upload.attachment}`,
			name: `${name}`
		}).catch(err => {
			setTimeout(() => {
				console.log(err);
				return interaction.editReply({content: `${err.rawError.message}`});
			}, 2000)
		})
		setTimeout(() => {
			if (!emoji) return;

			const embed = new EmbedBuilder()

				.setColor("Blue")
				.setDescription(`Your emoji has been uploaded ${emoji}`)

			interaction.editReply({content: ``, embeds: [embed]});
		}, 3000)

	}
}