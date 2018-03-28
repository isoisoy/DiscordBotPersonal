const Discord = require("discord.js");
const fs = require("fs");
const { exec } = require('child_process');
const client = new Discord.Client();
const config = require("./config.json");
const botGuild = require("./botguild.json"); //Bot Guild IDs
const dracGuild = require("./dracarg.json"); //Draconian Argentum Guild IDs

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) =>{
  if (message.content.startsWith("#bad")){
    var badPerson = message.content.substring(5,5+18);
    badPerson = String(badPerson);
    //var badPerson = '215225483942428672';
    //console.log(badPerson);
    var badPersonAndDesc = message.content.substring(5);
    var text = fs.readFileSync('badppl.txt','utf8');
    // ids are 18 chars long, starts 25 next
    var theBadPeople = [];
    lengthBad = text.length;
    var iter = lengthBad/25;
    var isBad = 0;
    var j = 0;
    for (var i = 0; i < iter; i++){
      theBadPeople[i] = text.substring(j,j+18);
      j = j+25;
    }
    //console.log(text);
    //console.log(theBadPeople);
    for (var k = 0; k < iter; k++){
      if (theBadPeople[k]==badPerson){
        message.channel.send("That is a bad person.");
        isBad = 1;
      }
    }

    if (isBad){
      // do nothing
    } else{
      //add them to the list
      fs.appendFile('badppl.txt',badPersonAndDesc, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
    }
  }
});
client.login(config.token);
