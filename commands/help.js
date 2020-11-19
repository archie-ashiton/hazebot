module.exports = {
    name: 'help',
    execute(message, args){
        const helpEmbed = {
            color: 0xBCB7AB,
            title: 'haze',
            description: '<> - optional arguments\n[] - mandatory arguments\n\n**General Commands**\n`,help` - displays this menu\n\n**Fun Commands**\n\n**Staff Commands**\n`,role [role] [user]`',
            footer: {
                text: 'xoxo',
            },
            timestamp: new Date(),
        };
        message.channel.send({ embed: helpEmbed });
    }
}