//Introduction
const Discord = require("discord.js"); // Discord
const fs = require("fs"); // File System
const client = new Discord.Client(); // Makes an object for the client
const config = require("./config.json"); // prefix and token
const botGuild = require("./botguild.json"); //Bot Guild IDs
const dracGuild = require("./dracarg.json"); //Draconian Argentum Guild IDs
const specPpl = require("./specialPeople.json"); // Special People IDS

// Time Constants
const day = 8.64*(10**7);
const hour = 3.6*(10**6);
const halfHour = 1.8*(10**6);
const minute = 60000;

// Response to ready client
client.on("ready", () => {
  console.log("I am ready!");
  console.log(client.status);
});

// Variables
var roleEval; // Role to Evaluate
var roleCheck; // Role to Check Against
var roleList; // List of Assigned Roles
var removeTheRole; // Boolean-ish for if role needs to be removed
var ConnNow; // connection value

// Constants
const owner = specPpl.Iso; // my own id 215225483942428672
const Dani = specPpl.Dani;
const Gamb = specPpl.Gambit;
const Snik = specPpl.Nikita;
const Jynx = specPpl.Jynx;
const Sea = specPpl.Sea;
const Hiei = specPpl.Hiei;
const Kinga = specPpl.Kinga;
const Mads = specPpl.Mads;
const DanGar = specPpl.DanGar;
const Ber = specPpl.Beronica;
const Hola = specPpl.Hola;
const Batsi = specPpl.Batsi;
const BestNicky = specPpl.BestNicky;
const Bjarke = specPpl.Bjarke;
const Sancho = specPpl.Sancho;

// Bot related
const prefix = config.prefix;

// Emojis
const reactEmoji = "423264671030837303";

// Command lists

// Game list
const gamesListCap = [
  "ARK",        // 0
  "BF",         // 1
  "ESO",        // 2
  "Haven",      // 3
  "LOL",        // 4
  "Minecraft",  // 5
  "PUBG",       // 6
  "Terraria"   // 7
];

// Basic Info List
const basicInfo = [
  "Help",       // 0
  "Ajuda",      // 1
  "List",       // 2
  "Lista",      // 3 // In list and lista command, I stop i here
  "Emoji",      // 4
  "RoleID",     // 5
  "Bad",        // 6
  "NotBad"      // 7
];

// Special Command list
const specialCommand = [
  "Ping",       // 0
  "Gamesoffered",// 1
  "Me",         // 2
  "Fucksgiven", // 3
  "Doubt",      // 4
  "Truestory",  // 5
  "Iso",        // 6
  "8Ball",      // 7
  "Otter"       // 8
];

// Haven commands
const havenList = [
  "Coords",      // 0
  "setTimer",    // 1
  "checkTimer",  // 2
  "deleteTimer"  // 3
];

// When guild members are added
client.on("guildMemberAdd", (addedMember) =>{
  var userTag = addedMember.user;
  var displayedName = addedMember.displayName;
  var guildAdded = addedMember.guild.id;

  if (guildAdded == dracGuild.guildID){ // This is an intro for Draconian Argentum
    var msg = ":flag_gb: Welcome to **Draconian Argentum**! I am Whelp and I help you get around on the server. ";
    client.guilds.get(dracGuild.guildID).channels.get(dracGuild.welcomeChat).send("Hello "+displayedName+"! "+msg+
      "I've left you a message in the #bot channel."+
      "\n\n :flag_br: Olá! Seja bem vindo a **Draconian Argentum**! Eu sou Whelp e vou te ajudar a se acertar no servidor. "+
      "Te deixei uma mensagem no canal #bot.");
    client.guilds.get(dracGuild.guildID).channels.get(dracGuild.botReport).send(userTag+":flag_gb: You can send me commands in this channel. For more information, send '!help'.\n\n"+
      ":flag_br: Você pode me enviar comandos neste canal. Para mais informações, digite '!ajuda'.");
  }else{

  }
});

// When the connection fails
client.on("error", (errorC) => {
  console.log("Connection timed out.");

  var yes = client.setInterval(function(){
          console.log("Made it into the setinterval.");
          client.login(config.token)
          .then((stringC)=>{
            console.log("Attempted to log in.");
            ConnNow = client.status;
            console.log(ConnNow);
            if (ConnNow == 0){
              client.clearInterval(yes);
              var sendMe = client.guilds.get(botGuild.guildID).members.get(owner);
              sendMe.createDM();
              sendMe.send("I have disconnected, but now I am reconnected.");
            }
          }).catch((err)=>{
            console.error(err);
          });
        },10000);

});

client.on("message", (message) => {
  // Basic checks
  // starts with prefix, author is not a bot, channel is not a dm
  var channelType = message.channel.type;
  var notAccepted = "dm";
  if (!message.content.startsWith(prefix) || message.author.bot || channelType == notAccepted){
    return;
  }

  // check if bad user
  // a bad user cannot use commands
  var personID = message.author.id;
  var isBad = badPplFinder(personID);

  if (isBad){
    message.channel.send("You do not have permission to use commands.");
    return;
  }

  // Breaking down the message
  var contentsMess = message.content.split(' ');
  var theCommand = contentsMess[0].substring(1);

  // message properties
  var name = message.author.username; // used in the bot report
  var nickCheck = message.member.nickname;

  // author properties
  roleList = message.member.roles;
  roleCheck = roleList.map(r => r.id);

  // trigger checks
  removeTheRole = 0;
  var commandTrigger = 0;

  // checks the command against their nickname for special command
  if (theCommand == nickCheck) {
    message.channel.send("Talk about special treatment. You ain't special, "+nickCheck+".");
  }

  // evaluating commands
  if (toAll(basicInfo[0],theCommand)){ // help
    message.channel.send(
      "Hello! I'm Whelp. I'm a bot created to help with " +
      "moderation within this chat. " +
      "You can send me commands to join the different "+
      "chats and channels according to the games you play. "+
      "My commands follow a format of !<game>. "+
      "A couple examples: \n"+
      "!ESO \n!ARK \n!LOL\n"+
      "For a list of game commands, type '!gamesoffered'. "+
      "To have a list of my commands sent to you, type '!list'."
    );
  }
  else if(toAll(basicInfo[1],theCommand)){ // ayuda
    message.channel.send(
      "Olá! Eu sou Whelp. Sou um bot criado para ajudar " +
      " com a moderação deste chat." +
      "Você pode me enviar comandos para se juntar aos diferentes " +
      "chats e canais de acordo com os jogos que você joga." +
      "Meus comandos seguem o seguinte formato: !<jogo>." +
      "Alguns exemplos: \n" +
      "!ESO \n!ARK \n !LOL\n" +
      "Para uma lista dos jogos disponíveis, digite '!gamesoffered'. "+
      "Para ver uma lista de todos os meus comandos, digite '!lista'."
    );
  }
  else if(toAll(basicInfo[2],theCommand)){ // list
    message.author.createDM();
    var commandList = "";
    for (var i = 0; i < basicInfo.length-4; i++) {
        commandList += prefix+basicInfo[i] + "\n";
      }
    for (var z = 0; z < gamesListCap.length; z++) {
      commandList += prefix+gamesListCap[z]+ "\n";
    }
    for (var g = 0; g < specialCommand.length; g++) {
      commandList += prefix+specialCommand[g]+"\n";
    }
    for (var h = 0; h < havenList.length-3; h++){
      commandList += prefix+havenList[h]+"\n";
    }
    message.author.send("This is the list of my commands. \n"+commandList);
  }
  else if(toAll(basicInfo[3],theCommand)){ // lista
    message.author.createDM();
    var commandList = "";
    for (var i = 0; i < basicInfo.length-4; i++) {
        commandList += prefix+basicInfo[i] + "\n";
      }
    for (var z = 0; z < gamesListCap.length; z++) {
      commandList += prefix+gamesListCap[z]+ "\n";
    }
    for (var g = 0; g < specialCommand.length; g++) {
      commandList += prefix+specialCommand[g]+"\n";
    }
    for (var h = 0; h < havenList.length-3; h++){
      commandList += prefix+havenList[h]+"\n";
    }
    message.author.send("Essa é a lista de meus comandos. \n"+commandList);
  }
  else if(toAll(basicInfo[4],theCommand)){ // emoji
    if (personID == owner){
      var emojis = message.guild.emojis;
      console.log(emojis);
    }
  }
  else if(toAll(basicInfo[5],theCommand)){ // roleID
    if (personID == owner){
      var absrolelist = message.guild.roles;
      console.log(absrolelist);
    }
  }
  else if(toAll(basicInfo[6],theCommand)){ // bad
    if (personID == owner || personID == Snik || personID == Dani){
      let theMentioned = message.mentions.users;
      var mentionedUserID = theMentioned[0].id;
      var checkBad = badPplFinder(mentionedUserID);
      if (checkBad){
        message.channel.send("That person is already bad.");
      }else{
        let mentionedName = theMentioned[0].username;
        let addedBad = mentionedName + "|"+ mentionedUserID+".";
        fs.appendFile('badppl.txt',addedBad, function (err){
          if (err) throw err;
          console.log("Saved Bad Person:");
          console.log(addedBad);
        });
      }
    } else {
      message.channel.send("You are not authorized to use this command.");
    }
  }
  else if(toAll(basicInfo[7],theCommand)){ // notbad
    if (personID == owner || personID == Snik || personID == Dani){
      let theMentioned = message.mentions.users;
      var mentionedUserID = theMentioned[0].id;
      var checkBad = badPplFinder(mentionedUserID);
      if (checkBad){
        let theBadPeeps = fs.readFileSync('badppl.txt','utf8');
        let individualPeeps = theBadPeeps.split('.'); // splits the bad people up
        var n
        var found = false;
        for ( n = 0; n<individualPeeps.length; n++){
          let splitPeep = individualPeeps[n].split('|');
          let PeepID = splitPeep[1];
          if (PeepID == mentionedUserID){
            found = true;
            break;
          }
        }
        if (found){
          individualPeeps.splice(n,1);
          var newBadPeeps = individualPeeps.join('|');
          fs.writeFile('badppl.txt', newBadPeeps,function (err) {
            if (err) throw err;
          });
        } else {
          message.channel.send("Error: Person not found.");
        }
      }else{
        message.channel.send("That person is not bad.");
      }
    } else {
      message.channel.send("You are not authorized to use this command.");
    }
  }
  //------------------------------------------------------------------------------
  else if(toAll(specialCommand[0],theCommand)){ // Ping
    message.channel.send("ok, maybe a little pong.");
  }
  else if(toAll(specialCommand[1],theCommand)){ // gamesoffered
    message.channel.send("Game Categories Currently Offered:\n"+
    "Ark [!ARK]\nBattlefield [!BF]\nElder Scrolls Online [!ESO]"+
    "\nHaven & Hearth [!Haven]"+
    "\nLeague of Legends [!LOL]\nMinecraft [!Minecraft]"+
    "\nPLAYERUNKNOWN's Battlegrounds [!PUBG]\nTerraria [!Terraria]"
    );
  }
  else if(toAll(specialCommand[2],theCommand)){ // me
    switch(personID){
      case owner:
        message.channel.send("You are "+name+", you piece of shit.");
        break;
      case Dani:
        message.channel.send("You are Dani! I'm so happy to see you!");
        break;
      case Gamb:
        message.channel.send("Hey, Gambit! Go back to digging dirt!");
        break;
      case Snik:
        message.channel.send("You are snik-snak!");
        break;
      case Sea:
        message.channel.send("Hey Puddle!");
        break;
      case Kinga:
        message.channel.send("You are the polska onion!");
        break;
      case Mads:
        message.channel.send("Ey, you are Mads. Psure.");
        break;
      case DanGar:
        message.channel.send("You're the Danny DeVito boy. JK! You're Dan Gar.");
        break;
      case Jynx:
        message.channel.send("It's a you, Jynxsu!");
        break;
      case Hiei:
        message.channel.send("Oh hai! You're my sempai!");
        break;
      case Ber:
        message.channel.send("It's you! The best Ber in the world!");
        break;
      case Hola:
        message.channel.send("You're *translates* hello friend! I'm mulitlingual, baby!");
        break;
      case Batsi:
        message.channel.send("You're the undead batman!");
        break;
      case BestNicky:
        message.channel.send("You're the best Nicky Parsons!");
        break;
      case Sancho:
        message.channel.send("You....you stole my creator's last name. JK You're the gold digger Sancho. :smirk:");
        break;
      case Bjarke:
        message.channel.send("You're bjarbjar!");
        break;
      default:
        message.channel.send("You are "+name+"!");
        break;
    }
  }
  else if(toAll(specialCommand[3],theCommand)){ // fucksgiven
    var numOfFucks = getRandomInt(20);
    if (numOfFucks == 0){
      message.channel.send("Damn! You give no fucks.");
    } else if(numOfFucks == 20) {
      message.channel.send("Woah! You give "+numOfFucks+"! Max fuckage!");
    } else if (numOfFucks == 1) {
      message.channel.send(":( Just a single fuck.");
    }else if(numOfFucks == 21){
      message.channel.send("Ayyyyyy 21 fucks!");
    }else {
      message.channel.send("You give "+numOfFucks+" fucks.");
    }
  }
  else if(toAll(specialCommand[4],theCommand)){ // doubt
    message.channel.send({
      files: ['https://cdn.discordapp.com/attachments/227597884646752256/428632515939532801/e02e5ffb5f980cd8262cf7f0ae00a4a9_press-x-to-doubt-memes-memesuper-la-noire-doubt-meme_419-238.png']
    });
    // (x) doubt meme
  }
  else if(toAll(specialCommand[5],theCommand)){ // truestory
    message.channel.send({
      files: ['https://cdn.discordapp.com/attachments/409071061527691266/429088221176266752/TRUESTORY.png']
    });
    //true story meme
  }
  else if(toAll(specialCommand[6],theCommand)){ // iso
    client.guilds.get(botGuild.guildID).channels.get(botGuild.IsoChat).fetchMessages({limit:1})
    .then(messagesf =>{
      let mapper = messagesf.array();
      let actualMessage = mapper[0].content;
      message.channel.send("Iso "+actualMessage);

    });
  }
  else if(toAll(specialCommand[7],theCommand)){ // 8ball
    let ballnum = getRandomInt(20);
    switch (ballnum){
      case 0:
        message.channel.send("Without a doubt.");
        break;
      case 1:
        message.channel.send("It is certain.");
        break;
      case 2:
        message.channel.send("Reply hazy, try again.");
        break;
      case 3:
        message.channel.send("Don't count on it.");
        break;
      case 4:
        message.channel.send("As I see it, yes.");
        break;
      case 5:
        message.channel.send("Ask again later.");
        break;
      case 6:
        message.channel.send("My reply is no.");
        break;
      case 7:
        message.channel.send("It is decidedly so.");
        break;
      case 8:
        message.channel.send("Most likely.");
        break;
      case 9:
        message.channel.send("Better not tell you now.");
        break;
      case 10:
        message.channel.send("My sources say no.");
        break;
      case 11:
        message.channel.send("Outlook good.");
        break;
      case 12:
        message.channel.send("Yes, definitely.");
        break;
      case 13:
        message.channel.send("Cannot predict now.");
        break;
      case 14:
        message.channel.send("Outlook not so good.");
        break;
      case 15:
        message.channel.send("Yes.");
        break;
      case 16:
        message.channel.send("You may rely on it.");
        break;
      case 17:
        message.channel.send("Concentrate and ask again.");
        break;
      case 18:
        message.channel.send("Very doubtful.");
        break;
      case 19:
        message.channel.send("Signs point to yes.");
        break;
      case 20:
        message.channel.send("Will consider.");
        break;
    }
  }
  else if(toAll(specialCommand[8],theCommand)){ // otter
    client.guilds.get(botGuild.guildID).channels.get(botGuild.otterChat).fetchMessages({limit:50})
    .then(messagesO => {
      let otterMap = messagesO.array();
      //console.log(ottermap);
      let otterLength = otterMap.length;
      let otterRoll = getRandomInt(otterLength);
      //console.log(otterLength);
      //console.log(otterRoll);
      if (otterRoll == otterLength){
        otterRoll = otterLength - 1;
      }
      let otterThis = otterMap[otterRoll];
      //console.log(otterThis);
      let otterPic = otterThis.content;
      message.channel.send(otterPic);
    });
  }
  //------------------------------------------------------------------------------
  else if(toAll(gamesListCap[0],theCommand)){ // ARK
    roleEval = dracGuild.roles.ARK;
    roleMod(roleEval,message);
  }
  else if(toAll(gamesListCap[1],theCommand)){ // BF
    roleEval = dracGuild.roles.BF;
    roleMod(roleEval,message);
  }
  else if(toAll(gamesListCap[2],theCommand)){ // ESO
    roleEval = dracGuild.roles.ESO;
    roleMod(roleEval,message);
  }
  else if(toAll(gamesListCap[3],theCommand)){ // Haven
    roleEval = dracGuild.roles.Haven;
    roleMod(roleEval,message);
  }
  else if(toAll(gamesListCap[4],theCommand)){ // LOL
    roleEval = dracGuild.roles.LOL;
    roleMod(roleEval,message);
  }
  else if(toAll(gamesListCap[5],theCommand)){ // Minecraft
    roleEval = dracGuild.roles.Minecraft;
    roleMod(roleEval,message);
  }
  else if(toAll(gamesListCap[6],theCommand)){ // PUBG
    roleEval = dracGuild.roles.PUBG;
    roleMod(roleEval,message);
  }
  else if(toAll(gamesListCap[7],theCommand)){ // Terraria
    roleEval = dracGuild.roles.Terraria;
    roleMod(roleEval,message);
  }
  //------------------------------------------------------------------------------
  else if(toAll(havenList[0],theCommand)){ // Coords
    let theCoords = contentsMess[1];
    let indivCoords = theCoords.split(',');
    let xCoord = indivCoords[0];
    let yCoord = indivCoords[1];
    if (Number(xCoord)=="NaN"||Number(yCoord)=="NaN"){
      message.channel.send("The coordinates need to be numbers.");
      return;
    }
    if (Number(xCoord)>125||Number(xCoord)<-125){
      message.channel.send("The x-coordinate is out of bounds.");
    }else if(Number(yCoord)>125||Number(yCoord)<-125){
      message.channel.send("The y-coordinate is out of bounds.");
    }else{
      let siteAddr = "http://odditown.com/haven/map/#x="+xCoord+"&y="+yCoord+"&zoom=8";
      let picture = "http://www.odditown.com/haven/map/tiles/9/"+xCoord+'_'+yCoord+'.png';
      let fancyCoords = xCoord.concat(", ",yCoord);
      var embed = new Discord.RichEmbed();
      embed.setTitle("Haven Map Coordinates");
      embed.setColor(3447003);
      embed.setImage(picture);
      embed.addField("Coordinates",fancyCoords);
      embed.addField("Link",siteAddr)
      embed.addField("Map Image", "Little map.");
      message.channel.send({embed});
    }
  }
  else if(toAll(havenList[1],theCommand)){ // setTimer
    if (personID == owner || personID == Snik || personID == Dani||personID == Gamb){
      message.channel.send("This is for a timer.");
      var param = contentsMess.length;
      if (param <= 2){
        message.channel.send("Not enough parameters given.");
      }
      else if (param == 3) { // ---------------------------- command name m -----------------------------------
        // check for m
        let checkForM = contentsMess[2];
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
        let nameTime = contentsMess[1];
        createTime(nameTime,0,0,numOfMin);

      }
      else if (param == 4) { // ----------------------------- command name h m ---------------------------------
        // check for h m
        // checks for m
        let checkForM = contentsMess[3];
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
        let checkForH = contentsMess[2];
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
        let nameTime = contentsMess[1];
        createTime(nameTime,0,numOfHour,numOfMin);

      }
      else if (param == 5) { // ----------------------------- command name d h m -------------------------------
        // check for d h m
        // checks for m
        let checkForM = contentsMess[4];
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
        let checkForH = contentsMess[3];
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
        let checkForD = contentsMess[2];
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
        let nameTime = contentsMess[1];
        createTime(nameTime,numOfDay,numOfHour,numOfMin);
      }
      else {
        message.channel.send("Too many parameters.");
      }
    } else {
      message.channel.send("This command is not open to the public yet.");
    }
  }
  else if(toAll(havenList[2],theCommand)){ // checkTimer
    message.channel.send("Checking timer.");
    let nameTimeCheck = contentsMess[1];

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
      var remainTime = Number(timerTime)-nowTime;
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
  else if(toAll(havenList[3],theCommand)){ // deleteTimer
    let nameTimeCheck = contentsMess[1];
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
  else{
    commandTrigger = 1;
  }
  var goodReport = " asked me ";
  var badReport = " tried to use ";
  var finalReport;

  if (commandTrigger){
    finalReport = badReport;
  } else {
    finalReport = goodReport;
  }

  client.guilds.get(botGuild.guildID).channels.get(botGuild.botReport).send(name+"/"+nickCheck+finalReport+contentsMess[0]);

});

// to log in the bot
client.login(config.token);

// Functions

// takes a string and returns it original || capitalized || lowercase
function toAll(string,identif){
  let original = string;
  let stringCap = string.toUpperCase();
  let stringLower = string.toLowerCase();
  return identif == original || identif == stringCap || identif == stringLower
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

//random num gen
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max+1));
}

// bad ppl finder
function badPplFinder(id) {
  inputID = String(id);
  let theBadPeeps = fs.readFileSync('badppl.txt','utf8');
  let individualPeeps = theBadPeeps.split('.'); // splits the bad people up
  var isBad;
  var n
  var found = false;
  for ( n = 0; n<individualPeeps.length; n++){
    let splitPeep = individualPeeps[n].split('|');
    let PeepID = splitPeep[1];
    if (PeepID == inputID){
      found = true;
      break;
    }
  }
  if (found) {
    isBad = 1;
  }

  return isBad
}

//timer function
// creates timer
function createTime(name,day,hour,minute){
  let thisTime = Date.now();
  let addDay = day*8.64*(10**7); // converts the number of days into milliseconds
  let addHour = hour*3.6*(10**6); // converts the number of hours into milliseconds
  let addMin = minute*60000; // converts the number of minutes into milliseconds

  let addedTime = addDay + addHour + addMin; // combines to the total number of milliseconds

  let timerEnd = thisTime + addedTime; // This is when the timer completes
  recorded = name + "."+ timerEnd.toString()+",";
  fs.appendFile('timertext.txt',recorded, function (err) {
      if (err) throw err;
    });
    return;
}
