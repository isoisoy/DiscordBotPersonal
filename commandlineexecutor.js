// gonna try to send ping website to powershell and then read response

const Discord = require("discord.js");
const exec = require('child_process');
const client = new Discord.Client();
const config = require("./config.json");
const botGuild = require("./botguild.json"); //Bot Guild IDs
const dracGuild = require("./dracarg.json"); //Draconian Argentum Guild IDs

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {


exec('ping game.havenandhearth.com', (err,stdout,stderr) => {
  if (err){
    return;
  }
  console.log('stdout: ${stdout}');
});
