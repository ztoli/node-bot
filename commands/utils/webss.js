const {SlashCommandBuilder, AttachmentBuilder, EmbedBuilder} = require('discord.js');
const puppeteer = require('puppeteer');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('web-screenshot')
		.setDescription('Take a screenshot of a website')
		.addStringOption(option => option.setName('website').setDescription('the site to take a screenshot of')),
	async execute(interaction) {

		await interaction.deferReply()

		const {options} = interaction;

		const website = options.getString('website');

		try {
			const browser = await puppeteer.launch({headless: `new`});
			const page = await browser.newPage();
			await page.goto(website);
			await page.setViewport({width: 1920, height: 1080});

			const screenshot = await page.screenshot();
			await browser.close();


			const buffer = Buffer.from(screenshot, base64);
			const attachment = new AttachmentBuilder(buffer, {name: 'image.png'});
			console.log("we are getting here")

			const embed = new EmbedBuilder()
				.setColor("Blue")
				.setImage('attachment://image.png')

			await interaction.editReply({embeds: [embed], files: [attachment]});
		} catch (e) {
			await interaction.editReply({content: `Error getting a screenshot.  Try again with a valid site.`})
		}
	}

}