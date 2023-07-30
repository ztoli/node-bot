const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const superagent = require('superagent');
const onlyEmoji = require('emoji-aware').onlyEmoji;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojimixer')
        .setDescription('Mixes emojis to make super hot ones..')
        .addStringOption(option => option.setName('emoji').setDescription('the emojis to combine').setRequired(true)),
    async execute(interaction){

        await interaction.deferReply({ ephemeral: true });

        const { options } = interaction;
        const eString = options.getString('emojis');
        const input = onlyEmoji(eString);
        const response = `One or both of these emojis are not supported. Keep in mind that gestured (thumbs up) etc are NOT supported. Neither are nitro stickers.`;

        const output = await superagent.get('https://tenor.googleapis.com/v2/featured')
            .query({
                key: 'AIzaSyAA9fhu8bz4iPqU01XlJ2g6SQ_t7p-wVzA',
                contentfilter: "high",
                media_filter: "png_transparent",
                component: "proactive",
                collection: "emoji_kitchen_v5",
                q: input.join('_')
            });

        if (!output) {
            return await interaction.editReply({ content: response });
        } else if (!output.body.results[0]) {
            return await interaction.editReply({ content: response });
        } else if (eString.startsWith('<') || eString.endsWith('>')) {
            return await interaction.editReply({ content: response });
        }

        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setImage(output.body.results[0].url)

        await interaction.editReply({ embeds : [embed] });
    }
}






// tenor api key: AIzaSyAA9fhu8bz4iPqU01XlJ2g6SQ_t7p-wVzA