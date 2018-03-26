// gonna try to send ping website to powershell and then read response

const Discord = require("discord.js");
const { exec } = require('child_process');
const client = new Discord.Client();
const config = require("./config.json");
const botGuild = require("./botguild.json"); //Bot Guild IDs
const dracGuild = require("./dracarg.json"); //Draconian Argentum Guild IDs

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {

  if (message.content.startsWith("pinger")){
    exec('ping game.havenandhearth.com', (err,stdout,stderr) => {
      if (err){
        return;
      }
      console.log('stdout: ${stdout}',stdout);
      // gotta parse through the message
      var pos = stdout.indexOf("Lost"); //number of index where Lost will start
      var importantPos = pos + 7;
      var numOfLosses = stdout.substr(importantPos,1);

      if (numOfLosses == "0"){
        message.channel.send("The game server seems to be responding.")
      } else if (numOfLosses == "4"){
        message.channel.send("The game server appears to be down.")
      } else {
        message.channel.send("The game server may or may not be down.")
      }

    });
  }
});

// to log in the bot
client.login(config.token);
