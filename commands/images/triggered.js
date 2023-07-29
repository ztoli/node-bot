const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Gets the weather of a given area')
        .addStringOption(option => option.setName('location').setDescription('Location to check the weather of').setRequired(true)),
        async execute(interaction){

            const { options } = interaction;
            const location = options.getString('location');

            await interaction.reply({ content: `Gathering the data... (Did you know you can also look out the window?`});


            await weather.find({ search: `${location}`, degreeType: `C`}, async function(err, result) {

                setTimeout(() => {
                    if (err) {
                        console.log(err);
                        interaction.editReply(`Error while pulling data, try again later.`)
                    } else {
                        if (result.length == 0){
                            return interaction.editReply({content : `couldnt find weather of the location.`});
                        } else {
                            const temp = result[0].current.temperature;
                            const type = result[0].current.skytext;
                            const name = result[0].location.name;
                            const feel = result[0].current.feelslike;
                            const icon = result[0].current.imageUrl;
                            const wind = result[0].current.winddisplay;
                            const day = result[0].current.day;
                            const alert = result[0].location.alert || 'none';

                            const embed = new EmbedBuilder()
                                .setColor("Blue")
                                .SetTitle(`Current weather of ${name}`)
                                .AddFields({ name: `Temperature`, value: `${temp}`})
                                .AddFields({ name: `Feels like`, value: `${feel}`})
                                .AddFields({ name: `Weather`, value: `${type}`})
                                .AddFields({ name: `Current Alerts`, value: `${alert}`})
                                .AddFields({ name: `Week Day`, value: `${day}`})
                                .AddFields({ name: `Wind speed & direction`, value: `${wind}`})
                                .setThumbnail(icon)

                                interaction.editReply({ content: ``, embeds: [embed]});

                        }
                    }
                }, 2000)
            })
        }

}