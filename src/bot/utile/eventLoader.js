const reqEvent = (event) => require(`../logs/${event}`)
module.exports = (client) => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('message', reqEvent('message'));
 //logs serveur
  client.on('channelCreate', reqEvent('channelCreate'));
  client.on('channelDelete', reqEvent('channelDelete'));
  client.on('messageDelete', reqEvent('messageDelete'));
  client.on('messageUpdate', reqEvent('messageUpdate'));
  client.on('channelUpdate', reqEvent('channelUpdate'));
};
