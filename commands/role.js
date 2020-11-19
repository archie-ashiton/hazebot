module.exports = {
    name: 'role',
    execute(message, args){
        const role = message.guild.roles.cache.find(role => role.name === `${args[0]}`);
        const member = message.mentions.members.first();
        if(!message.member.roles.cache.some(role => role.name === 'own')) return message.channel.send('that\'s an admin command');
        if(!args.length){
            message.channel.send('correct usage: `,role <role> <user>`');
        }else{
            member.roles.add(role);
        }
    }
}