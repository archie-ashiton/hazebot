module.exports = {
    name: 'welcome',
    execute(message, args){
        bot.emit('guildMemberAdd', message.member);
    }
}