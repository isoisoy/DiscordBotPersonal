// Introduction
const Discord = require("discord.js");
const fs = require("fs");
const { exec } = require('child_process');
const client = new Discord.Client();
const config = require("./config.json");
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
const minute = 60000;

client.on("ready", () => {
  console.log("I am ready!");
  console.log(client.status);
});

client.on("message", (message) => {
  var channelType = message.channel.type;
  var acceptedType = "dm";
  if (!message.content.startsWith(prefix) || message.author.bot){
   return;
  }
  if (channelType == acceptedType) {
    return;
  }
  var personID = message.author.id;
  var isBad = badPplFinder(personID);
  //console.log(isBad);
  if (isBad){
    message.channel.send("You do not have permission to use this command.");
    return;
  }
  var contentsMess = message.content.split(' ');
  var cmd = contentsMess[0];
  var name = message.author;
  var nameCheck = message.member.nickname;
  roleList = message.member.roles;
  roleCheck = roleList.map(r => r.id);
  removeTheRole = 0;
  var triggers = 1;
  fuck = 0;
  ball = 0;

  // if someone tries a command of their nickname
  var messageCheck = message.content.substring(1);
  if (messageCheck == nameCheck) {
    message.channel.send("All hail "+nameCheck+"!");
  }

  // setTimer starts here -------------------------------------------------------------------------------------
  var messageDivided = messageCheck.split(' ');
  if (messageDivided[0] == "setTimer"){
    message.channel.send("This is for a timer.");
    var param = messageDivided.length;
    if (param <= 2){
      message.channel.send("Not enough parameters given.");
    } else if (param == 3) { // ---------------------------- command name m -----------------------------------
      // check for m
      let checkForM = messageDivided[2];
      if (checkForM.length >3){
        message.channel.send("That is too long. The maximum minutes allowed is 60. Please add an hour if you wish to make the timer longer.");
        return;
      }
      if (checkForM.slice(-1) != "m"){
        message.channel.send("For only one parameter, the ending notation needs to be 'm'.");
        return;
      }
      let numOfMin = Number(checkForM.slice(0,-1));
      if (numOfMin > 60){
        message.channel.send("The maximum minutes allowed is 60.");
        return;
      }
      let nameTime = messageDivided[1];
      createTime(nameTime,0,0,numOfMin);

    } else if (param == 4) { // ----------------------------- command name h m ---------------------------------
      // check for h m
      // checks for m
      let checkForM = messageDivided[3];
      if (checkForM.length >3){
        message.channel.send("That is too long. The maximum minutes allowed is 60. Please add an hour if you wish to make the timer longer.");
        return;
      }
      if (checkForM.slice(-1) != "m"){
        message.channel.send("For two parameters, the ending notation of the second parameter needs to be 'm'.");
        return;
      }
      let numOfMin = Number(checkForM.slice(0,-1));
      if (numOfMin > 60){
        message.channel.send("The maximum minutes allowed is 60.");
        return;
      }
      // checks for h
      let checkForH = messageDivided[2];
      if (checkForH.length >3){
        message.channel.send("That is too long. The maximum hours allowed is 24. Please add a day if you wish to make the timer longer.");
        return;
      }
      if (checkForH.slice(-1) != "h"){
        message.channel.send("For two parameters, the ending notation of the first parameter needs to be 'h'.");
        return;
      }
      let numOfHour = Number(checkForH.slice(0,-1));
      if (numOfHour > 24){
        message.channel.send("The maximum hours allowed is 24.");
        return;
      }
      let nameTime = messageDivided[1];
      createTime(nameTime,0,numOfHour,numOfMin);

    } else if (param == 5) { // ----------------------------- command name d h m -------------------------------
      // check for d h m
      // checks for m
      let checkForM = messageDivided[4];
      if (checkForM.length >3){
        message.channel.send("That is too long. The maximum minutes allowed is 60. Please add an hour if you wish to make the timer longer.");
        return;
      }
      if (checkForM.slice(-1) != "m"){
        message.channel.send("For three parameters, the ending notation of the third parameter needs to be 'm'.");
        return;
      }
      let numOfMin = Number(checkForM.slice(0,-1));
      if (numOfMin > 60){
        message.channel.send("The maximum minutes allowed is 60.");
        return;
      }
      // checks for h
      let checkForH = messageDivided[3];
      if (checkForH.length >3){
        message.channel.send("That is too long. The maximum hours allowed is 24. Please add a day if you wish to make the timer longer.");
        return;
      }
      if (checkForH.slice(-1) != "h"){
        message.channel.send("For three parameters, the ending notation of the second parameter needs to be 'h'.");
        return;
      }
      let numOfHour = Number(checkForH.slice(0,-1));
      if (numOfHour > 24){
        message.channel.send("The maximum hours allowed is 24.");
        return;
      }
      // checks for d
      let checkForD = messageDivided[2];
      if (checkForD.length >3){
        message.channel.send("That is too long. The maximum hours allowed is 16. Please add a day if you wish to make the timer longer.");
        return;
      }
      if (checkForD.slice(-1) != "d"){
        message.channel.send("For three parameters, the ending notation of the first parameter needs to be 'd'.");
        return;
      }
      let numOfDay = Number(checkForD.slice(0,-1));
      if (numOfDay > 16){
        message.channel.send("The maximum hours allowed is 16.");
        return;
      }
      let nameTime = messageDivided[1];
      createTime(nameTime,numOfDay,numOfHour,numOfMin);
    } else {
      message.channel.send("Too many parameters.");
    }

  }

  //checkTimer starts here
  if (messageDivided[0] == "checkTimer"){
    message.channel.send("Checking timer.");
    let nameTimeCheck = messageDivided[1];

    var nowTime = Date.now();
    let allTimers = fs.readFileSync('timertext.txt','utf8');
    var individualTimers = allTimers.split(','); // splits the timers into an array where each element is a name and time
    var i;
    var found = false;
    for ( i = 0; i<individualTimers.length; i++){
      let splitTime = individualTimers[i].split('.');
      let timerName = splitTime[0];
      if (timerName == nameTimeCheck){
        found = true;
        break;
      }
    }
    if (found){
      message.channel.send("I found the timer.");
      let splitTime = individualTimers[i].split('.');
      let timerTime = splitTime[1];
      //console.log(timerTime);
      //console.log(nowTime);
      var remainTime = Number(timerTime)-nowTime;
      //console.log(remainTime);
      var daysRemain = 0;
      var hoursRemain = 0;
      var minRemain = 0;
      if (remainTime>= day){
        daysRemain = Math.floor(remainTime/day);
        remainTime = remainTime % day;
      }
      if (remainTime >= hour){
        hoursRemain = Math.floor(remainTime/hour);
        remainTime = remainTime % hour;
      }
      if (remainTime >= minute){
        minRemain = Math.floor(remainTime/minute);
        remainTime = remainTime % minute;
      }

      message.channel.send("For the timer '"+nameTimeCheck+"' : "+daysRemain+" days, "+hoursRemain+" hours, and "+minRemain+
      " minutes remain.");
    } else {
      message.channel.send("There is no such timer.");
    }
  }

  //deleteTimer starts here
  if (messageDivided[0]== "deleteTimer"){
    let nameTimeCheck = messageDivided[1];
    let allTimers = fs.readFileSync('timertext.txt','utf8');
    var individualTimers = allTimers.split(','); // splits the timers into an array where each element is a name and time
    var p;
    var found = false;
    for ( p = 0; p<individualTimers.length; p++){
      let splitTime = individualTimers[p].split('.');
      let timerName = splitTime[0];
      if (timerName == nameTimeCheck){
        found = true;
        break;
      }
    }
    if (found){
      individualTimers.splice(p,1);
      var newAllTimers=individualTimers.join(',');

      fs.writeFile('timertext.txt',newAllTimers,function (err) {
        if (err) throw err;
      });
    } else{
      message.channel.send("There is no such timer.");
    }
  }


});

// to log in the bot
client.login(config.token);

// Functions
// creates timer
function createTime(name,day,hour,minute){
  let thisTime = Date.now();
  let addDay = day*8.64*(10**7); // converts the number of days into milliseconds
  let addHour = hour*3.6*(10**6); // converts the number of hours into milliseconds
  let addMin = minute*60000; // converts the number of minutes into milliseconds

  let addedTime = addDay + addHour + addMin; // combines to the total number of milliseconds

  let timerEnd = thisTime + addedTime; // This is when the timer completes
  //console.log(thisTime);
  //console.log(timerEnd);
  recorded = name + "."+ timerEnd.toString()+",";
  fs.appendFile('timertext.txt',recorded, function (err) {
      if (err) throw err;
    });
    return;
}


// roleChecker
function roleMod(roleAssign,messageR){
  for (i = 0; i<roleCheck.length;i++){
    var x = new Boolean(roleCheck[i]==roleAssign);
    // if this is true, you have the role

    if (x == true) {

      removeTheRole = 1;
      break; //remove the role and break out of the for loop
    }else{
      //do nothing and continue
    }
  } // out of the for loop

  if (removeTheRole){
    messageR.member.removeRole(roleAssign);
    //messageR.channel.send("Role removed.");
    messageR.react(reactEmoji);
     //role removed
  }else if(removeTheRole ==0){
    messageR.member.addRole(roleAssign);
    //messageR.channel.send("Role added.");
    messageR.react(reactEmoji);
    //role added
  }
  return
}

// function for the certain commands that shouldn't be listed
function notAllowed(){
  var i
  return i == 4 || i == 5 || i == 18
}

//randome num gen
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max+1));
}

// bad ppl finder
function badPplFinder(id) {
  var text = fs.readFileSync('badppl.txt','utf8');
  id = String(id);
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
  for (var k = 0; k < iter; k++){
    if (theBadPeople[k]==id){
      //message.channel.send("That is already a bad person.");
      isBad = 1;
    }
  }

  return isBad
}

function isOdd(num) {
  return num % 2;
}
