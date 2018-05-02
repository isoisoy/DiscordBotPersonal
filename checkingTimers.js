// Introduction
const Discord = require("discord.js");
const fs = require("fs");
const { exec } = require('child_process');
const client = new Discord.Client();
const config = require("./config3.json");
const botGuild = require("./botguild.json"); //Bot Guild IDs
const dracGuild = require("./dracarg.json"); //Draconian Argentum Guild IDs
const specPpl = require("./specialPeople.json"); // Special People IDS


const owner = specPpl.Iso; // my own id 215225483942428672
const Dani = specPpl.Dani;
const Gamb = specPpl.Gambit;
const Snik = specPpl.Nikita;

const prefix = config.prefix;


//new Constants
const day = 8.64*(10**7);
const hour = 3.6*(10**6);
const halfHour = 1.8*(10**6);
const minute = 60000;

client.on("ready", () => {
  console.log("I am ready!");
  console.log(client.status);
});
// to log in the bot
client.login(config.token);

var runner = setInterval(conCheckingTimer,minute);

function conCheckingTimer(){
  var allTimers = fs.readFileSync('timertext.txt','utf8');
  var thisTime = Date.now();

  var individTimers = allTimers.split(',');
  var setForDelete = [];
  var j = 0;
  for (var t = 0; t<individTimers.length;t++){
    var timerProp = individTimers[t].split('.');
    var timerDone = Number(timerProp[1]);

    var difference = timerDone - thisTime;

    var timerName = timerProp[0];
    console.log(timerName)
    console.log(timerDone)
    console.log(thisTime)
    console.log(difference)
    if (difference > day){
      // do nothing
    }else if (difference < day && difference > (day-minute)) {
      client.guilds.get(botGuild.guildID).channels.get(botGuild.genChat).send("One day until "+timerName+"!");
    } else if (difference < day && difference> hour) {
      // do nothing
    } else if (difference < hour && difference > (hour-minute)) {
      client.guilds.get(botGuild.guildID).channels.get(botGuild.genChat).send("One hour until "+timerName+"!");
    } else if (difference < hour && difference > halfHour) {
      // do nothing
    } else if (difference < halfHour && difference > (halfHour-minute)) {
      client.guilds.get(botGuild.guildID).channels.get(botGuild.genChat).send("30 minutes until "+timerName+"!");
    } else if (difference < halfHour && difference > minute) {
      // do nothing
    } else if (difference < minute && difference > -minute) {
      client.guilds.get(botGuild.guildID).channels.get(botGuild.genChat).send(timerName+" is done!");
      setForDelete[j] = t;
      j++;
    }
  }
  if (setForDelete.length == 0){
    //do nothing
  }else{
    var k = 0;
    for (var g = 0; g<setForDelete.length;g++){
      individTimers.splice(setForDelete[g]-k,1);
      k++;
    }
    var newTime = individTimers.join(',');

    fs.writeFile('timertext.txt',newTime,function (err) {
      if (err) throw err;
    });
  }
}
