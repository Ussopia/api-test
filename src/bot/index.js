const { Client, Collection } = require("discord.js");
const { token , prefix } = require("./db/config.json");
const { readdirSync } = require("fs");
const client = new Client();
const Discord = require('discord.js')
require('./utile/eventLoader')(client);

["commands", "cooldowns", "aliases"].forEach(x => client[x] = new Collection());

client.prefix = prefix

//TODO: Premet de chargé toutes les commandes du client dans des sous-dossiers
const loadCommands = (dir = "./cmds/") => {
    readdirSync(dir).forEach((dirs) => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
            files.endsWith(".js")
        );

        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            getFileName.help.aliases.forEach(alias => {
                client.aliases.set(alias, getFileName.help.name);
            });
            console.log(`Commandes chargée : ${getFileName.help.name}`);
        }
    });
};

loadCommands();

let userStatus = [];
/*
client.on("presenceUpdate", (oldMember, newMember) => {
	if(newMember.user.id === '740811728593616980') {
		
    const hook = new Discord.WebhookClient('837418921967484938', 'NLFvumEYtmFHwjg7Cp3DW7tUtHvRpcsloV-5kD5apB8OpR2D3i_B245iy77rIMm0t80u');
 if(newMember.user.presence.status === 'online') {
hook.send(`${client.user.username} est en ligne`, {
	username: 'status',
	avatarURL: 'https://cdn.discordapp.com/attachments/835490292021985280/837371768334712912/inconnu.png',
});
}
    } else {
    	return;
   }
    
    let username = newMember.user.username;
    let status = newMember.user.presence.status;
    userStatus.push(username, status);
    console.log(`${newMember.user.username} is now ${newMember.user.presence.status}`);
    
})
*/


/*
client.on("presenceUpdate", (oldMember, newMember) => {
    let username = newMember.user.username;
    let status = newMember.user.presence.status;
    userStatus.push(username, status);
    console.log(`${newMember.user.username} is now ${newMember.user.presence.status}`);
})

client.on('message', (message) => {
    // if (!message.content.startsWith(prefix)) return;
   let username = userStatus;
                 status = userStatus;

 if (console.log())
        
    if (message.content.startsWith(prefix + "status")) {
        let clientembed = new Discord.MessageEmbed()
            .setDescription("Status Update")
            .setColor("#FFF")
            .addField('.............................................', `${username} is now ${status}`);

        message.channel.send(clientembed);

        userStatus = [];
    }
});
*/


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.snipes = new Discord.Collection(); //only needed if you are using the normal snipe command i posted earlier (which u should lol)
  client.editSnipes = new Discord.Collection();
});


client.on("messageUpdate", async(m, nm) => { //m = old mesage, nm = new message
  if (m.author.bot) return; //dont do anything if the author is a bot
  if (!client.editSnipes.get(m.channel.id)) client.editSnipes.set(m.channel.id, []); //if there are no snipes, turn it to an empty array
  const editSnipes = client.editSnipes.get(m.channel.id); //the array of edit snipes in the current channel
  const obj = { m, nm, editedAt: Date.now() }; // an object containing both the old and new messages
  client.editSnipes.set(m.channel.id, editSnipes.concat([obj])); //save it to client.editSnipes
});


client.login(token);
