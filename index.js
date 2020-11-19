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