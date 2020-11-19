const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = ',';
const guild = bot.guilds.cache.get('771756185136529459');
const fs = require('fs');

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
};

function game1(){
    bot.user.setActivity(`${prefix}help`);
};

bot.once('ready', () =>{
    console.log('haze is ready');
    game1();
});

bot.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.cache.find(channel => channel.name === 'hi-bye');
    const welcomeEmbed = {
        color: 0xBCB7AB,
        title: `**welcome ${member.displayName} :paperclips:**`,
        description: `check out:\n・<#771772323527000065>\n・<#771774430380163093>\n・<#771756185136529462>\nto get started<:w_butterfly1_h:772836377871777864>`,
        image: {
            url: 'https://media.discordapp.net/attachments/771763631523364894/771813797487968316/image0.png',
        },
        footer: {
            text: 'xoxo',
        },
        timestamp: new Date(),
    }
    channel.send(`${member}`) + channel.send({ embed: welcomeEmbed });
});

bot.on('guildMemberRemove', member =>{
    const channel = member.guild.channels.cache.find(channel => channel.name === 'hi-bye');
    
    channel.send(`**${member.displayName}** has left the server, bye whore <:w_butterfly1_h:772836377871777864>`);
});

bot.on('message', message =>{
    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	var channelName = message.channel.name;
	if (message.channel.type === 'dm') {
		var channelName = 'DM';
	}
	console.log(`${message.author.username} in #${channelName}: ` + message.content);
	if(message.content.startsWith('hi')){
		message.react('762872711557939220');
	};
	if(message.content.startsWith('ash') || message.content.startsWith('Ash')){
		message.react('762494006311518259');
	};

	if(message.author.bot || !message.content.startsWith(prefix))return;

    message.delete();
    
    if(command === 'welcome'){
        return bot.emit('guildMemberAdd', message.member);
    }
    
    if(command === 'mm'){
        const mmStartEmbed = {
            title: 'murder mystery',
            color: 0xBCB7AB,
            description: '**about**\neach person is given a role: `murderer`, `doctor`, `sheriff`, or `innocent`.\nthe murderer\'s job is to kill everyone without getting caught\nthe doctor\'s job is to heal someone of their choice before the murderer gets a chance to kill them.\nthe sheriff\'s job is to use evidence provided by the innocents to catch the murderer\nthe innocent\'s job is to provide evidence, however, they have no power.\n\n**rules**\nall server rules apply.\nkeep your dms open so the bot can dm you your role\nif you know who the murderer is, do not betray your team.\n\n**setup**\nto start the game, everyone that wants to play reacts to this message.\nif you are the murderer, you will recieve a list of people to kill each night\nif you are the doctor, you will recieve a list of people to heal each night\nonce the day begins, the citizens will present evidence and voting will start.\nany message sent by a dead innocent will be deleted',
            footer: {
                text: 'thanks for playing!'
            },
            timestamp: new Date()
        }
        return message.channel.send({ embed: mmStartEmbed })
            .then(sentMessage => sentMessage.react('<a:w_butterfly4:773274336835534869>'));
    }
	if(!bot.commands.has(command)){
		message.channel.send('use a real command');
    }

	try{
		bot.commands.get(command).execute(message, args);
	}catch(error){
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

bot.on('guildMemberUpdate', (oldmember, newmember) =>{
    const guild = bot.guilds.cache.get('771756185136529459');
    const channel = oldmember.guild.channels.cache.find(channel => channel.name === 'gen-pm');
    const pmEmbed = {
        color: 0xBCB7AB,
        title: `new pm - ${newmember.user.username} :paperclips:`,
        description: `**PM info**\nCheck out:\n・<#771816918813900801>\n・<#771816874957865010>\nto get started <:w_butterfly1_h:772836377871777864>`,
        footer:{
            text: 'xoxo'
        },
        timestamp: new Date()
    };
    if(!oldmember.roles.cache.some(role => role.name === 'pm')){
        if(newmember.roles.cache.some(role => role.name === 'pm')){
            channel.send({ embed: pmEmbed });
        };
    }else return;
});

bot.login(process.env.token);