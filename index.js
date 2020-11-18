const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = ',';
const guild = bot.guilds.cache.get('771756185136529459');

bot.on('ready', () =>{
    console.log('haze is ready');
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
	var channelName = message.channel.name;
	if (message.channel.type === 'dm'){
		var channelName = 'DM';
	};
	console.log(`${message.author.username} in #${channelName}: ` + message.content);
	if(message.content.startsWith('<@!773593301563342849>')){
		const prefixEmbed = {
			color: 0xBCB7AB,
			description: ':paperclips:  |  my prefix is: `,`!'
		};
		message.channel.send({ embed: prefixEmbed });
	};
    if(message.author.bot ||!message.guild ||!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	const guild = bot.guilds.cache.get('771756185136529459');

	if(command === 'welcome'){
		const channel = message.member.guild.channels.cache.find(channel => channel.name === 'hi-bye');
		const welcomeEmbed = {
			color: 0xBCB7AB,
			title: `**welcome ${message.member.displayName} :paperclips:**`,
			description: `check out:\n・<#771772323527000065>\n・<#771774430380163093>\n・<#771756185136529462>\nto get started<:w_butterfly1_h:772836377871777864>`,
			image: {
				url: 'https://media.discordapp.net/attachments/771763631523364894/771813797487968316/image0.png',
			},
			footer: {
				text: 'xoxo',
			},
			timestamp: new Date(),
		}
    	channel.send(`${message.member}`) + channel.send({ embed: welcomeEmbed });
	};

	if(command === 'help'){
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
	};

    if(command === 'role'){
		if(message.member.roles.cache.some(role => role.name === 'own' || 'admin' || 'bot dev')){
			const role = guild.roles.cache.find(role => role.name === `${args[0]}`);
			const member = message.mentions.members.first();
			if(!args[0] || !args[1]){
				message.channel.send('correct usage: `,role <role> <user>`');
			}else{
				member.roles.add(role);
			}
		}else{
			message.channel.send('that\'s an admin command');
		}
    };
});

bot.on('guildMemberUpdate', (oldmember, newmember) =>{
	const guild = bot.guilds.cache.get('771756185136529459');
	const channel = guild.channels.cache.find(channel => channel.name === 'gen-pm');
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