module.exports = {
    name: 'help',
    execute(message, args){
        const helpEmbed = {
            color: 0xBCB7AB,
            title: 'haze',
            description: '<> - optional arguments\n[] - mandatory arguments\n\n**General Commands**\n`,help` - displays this menu\n\n**Fun Commands**\n `,rps` - rock, paper, scissors\n\n**Staff Commands**\n`,role [role] [user]`',
            thumbnail: {
                url: 'https://media.discordapp.net/attachments/778754863516483584/778977513912533002/beigeaesthetic.jpg'
              },
            footer: {
                text: 'xoxo',
            },
            timestamp: new Date(),
        };
        message.channel.send({ embed: helpEmbed });
    }
}