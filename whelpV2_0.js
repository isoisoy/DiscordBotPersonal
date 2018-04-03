// Introduction
const Discord = require("discord.js");
const fs = require("fs");
const { exec } = require('child_process');
const client = new Discord.Client();
const config = require("./config.json");
const botGuild = require("./botguild.json"); //Bot Guild IDs
const dracGuild = require("./dracarg.json"); //Draconian Argentum Guild IDs
const specPpl = require("./specialPeople.json"); // Special People IDS

client.on("ready", () => {
  console.log("I am ready!");
});


// Variables
var roleEval;
var roleCheck;
var roleList;
var removeTheRole;
var messageR;

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


// Bot related
const prefix = config.prefix;

// Emojis
const reactEmoji = "423264671030837303";

const caseList = [
  "help",                // 0
  "ajuda",               // 1
  "list",                // 2
  "lista",               // 3
  "emoji",               // 4
  "roleID",              // 5
  "gamesoffered",        // 6
  "ping",                // 7
  "me",                  // 8
  "ARK",                 // 9
  "BF",                  // 10
  "ESO",                 // 11
  "Haven&Hearth",        // 12
  "LOL",                 // 13
  "Minecraft",           // 14
  "PUBG",                // 15
  "Terraria",            // 16
  "fucksgiven",          // 17
  "havenserver",         // 18
  "doubt",               // 19
  "truestory",           // 20
  "Iso"                 // 21
];



// When guild members are added
client.on("guildMemberAdd", (addedMember) =>{
  var userTag = addedMember.user;
  var displayedName = addedMember.displayName;
  var guildAdded = addedMember.guild.id;

  if (guildAdded == dracGuild.guildID){
    var msg = ":flag_gb: Welcome to **Draconian Argentum**! I am Whelp and I help you get around on the server. ";
    client.guilds.get(dracGuild.guildID).channels.get(dracGuild.welcomeChat).send("Hello "+displayedName+"! "+msg+
      "I've left you a message in the #bot channel."+
      "\n\n :flag_br: Olá! Seja bem vindo a **Draconian Argentum**! Eu sou Whelp e vou te ajudar a se acertar no servidor. "+
      "Te deixei uma mensagem no canal #bot.");
    client.guilds.get(dracGuild.guildID).channels.get(dracGuild.botReport).send(userTag+":flag_gb: You can send me commands in this channel. For more information, send '!help'.\n\n"+
      ":flag_br: Você pode me enviar comandos neste canal. Para mais informações, digite '!ajuda'.");
  }else{
    var msg = ":flag_gb Welcome to **Draconian Argentum**! I am Whelp and I help you get around on the server. ";
    client.guilds.get(botGuild.guildID).channels.get(botGuild.genChat).send("Hello "+displayedName+"! "+msg+
      "\n\n :flag_br: Olá! Seja bem vindo a **Draconian Argentum**! Eu sou Whelp e vou te ajudar a se acertar no servidor.");
    client.guilds.get(botGuild.guildID).channels.get(botGuild.genChat).send(userTag+":flag_gb: You can send me commands in this channel. For more information, send '!help'.\n\n"+
      ":flag_br: Você pode me enviar comandos neste canal. Para mais informações, digite '!ajuda'.");

    //client.guilds.get(botGuild.guildID).channels.get(botGuild.genChat).send("hello");
    //client.guilds.get(botGuild.guildID).channels.get(botGuild.genChat).send(userTag+" You can send me commands in this channel. For more information, send '!help'");
  }
});

// When role is updated
client.on("roleUpdate", (roleOld, roleNew) => {
  var roleOldName = roleOld.name;
  var roleName = roleNew.name;
  var roleID = roleNew.id;
  if (roleOldName == roleName){

  }else{
    fs.appendFile("./NewRoles.txt",roleOldName+ "  changed to  " + roleName+ " "+roleID+"\n", function(err) {
      if(err) {
          return console.log(err);
      }

    });
  }

});

// When a person is banned
client.on("guildBanAdd", (guildin, userin) => {
    var bannedUser = userin.id;
    var banGuild = guildin.id;
    const JubJubID = 218400607860424704;

    if (bannedUser == JubJubID){
      client.guilds.get(dracGuild.guildID).channels.get(dracGuild.genChat).send("LMAO JUBJUB GOT FREAKIN BANNED!");
    }
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
  var contentsMess = message.content.split(' ');
  var cmd = contentsMess[0];
  var name = message.author;
  var nameCheck = message.member.nickname;
  roleList = message.member.roles;
  roleCheck = roleList.map(r => r.id);
  removeTheRole = 0;
  var triggers = 1;

  // if someone tries a command of their nickname
  var messageCheck = message.content.substring(1);
  if (messageCheck == nameCheck) {
    message.channel.send("All hail "+nameCheck+"!");
  }

  switch(messageCheck) {
    case caseList[0]: // !help
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
      break;

    case caseList[1]: // !ajuda
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
        break;

    case caseList[2]: // !list
      message.author.createDM();
      var commandList = "";
      for (var i = 0; i < caseList.length; i++) {
        if (notAllowed()) {
        }else {
          commandList += caseList[i] + "\n";
        }
      }
      message.author.send("This is the list of my commands. \n"+commandList);
      break;

    case caseList[3]: // !lista
      message.author.createDM();
      var commandList = "";
      for (var i = 0; i < caseList.length; i++) {
        if (i == 4 || i == 5) {
        }else {
          commandList += caseList[i] + "\n";
        }
      }
      message.author.send("Essa é a lista de meus comandos. \n"+commandList);
      break;

    case caseList[4]: // !emoji
      var name4 = message.author.id;
      if (name4 == owner){
        var emojis = message.guild.emojis;
        console.log(emojis);
      }
      break;

    case caseList[5]: // !roleID
      var idspls = roleList.map(r => r.id); // isolates the role ids
      var absrolelist = message.guild.roles;
      console.log(absrolelist);
      break;

    case caseList[6]: // !gamesoffered
      message.channel.send("Game Categories Currently Offered:\n"+
      "Ark [!ARK]\nBattlefield [!BF]\nElder Scrolls Online [!ESO]"+
      "\nHaven & Hearth [!Haven&Hearth]"+
      "\nLeague of Legends [!LOL]\nMinecraft [!Minecraft]"+
      "\nPLAYERUNKNOWN's Battlegrounds [!PUBG]\nTerraria [!Terraria]"
      );
      break;

    case caseList[7]: // !ping
      message.channel.send("NO! NO PONG!");
      break;

    case caseList[8]: // !me

      var name2 = message.author.id;

      switch(name2){
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
        default:
          message.channel.send("You are "+name+"!");
          break;
      }
      break;

    case caseList[9]: // !ARK
      roleEval = dracGuild.roles.ARK;
      roleMod(roleEval,message);
      break;

    case caseList[10]: // !BF
      roleEval = dracGuild.roles.BF;
      roleMod(roleEval,message);
      break;

    case caseList[11]: // !ESO
      roleEval = dracGuild.roles.ESO;
      roleMod(roleEval,message);
      break;

    case caseList[12]: // !Haven&Hearth
      roleEval = dracGuild.roles.Haven;
      roleMod(roleEval,message);
      break;

    case caseList[13]: // !LOL
      roleEval = dracGuild.roles.LOL;
      roleMod(roleEval,message);
      break;

    case caseList[14]: // !Minecraft
      roleEval = dracGuild.roles.Minecraft;
      roleMod(roleEval,message);
      break;

    case caseList[15]: // !PUBG
      roleEval = dracGuild.roles.PUBG;
      roleMod(roleEval,message);
      break;

    case caseList[16]: // !Terraria
      roleEval = dracGuild.roles.Terraria;
      roleMod(roleEval,message);
      break;

    case caseList[17]: // !fucksgiven
      var numOfFucks = getRandomInt(20);
      let asker = message.author.id;
      if (asker != Jynx){
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
      }else{
        if (isOdd(numOfFucks)){
          message.channel.send("You give "+numOfFucks+" fucks.");
        } else if (numOfFucks == 20){
          message.channel.send("You sure you don't have like 20 fucks to give out?");
        } else if (numOfFucks == 2){
          message.channel.send("I can't tell. I can't even.");
        } else if (numOfFucks == 6){
          message.channel.send("Not sure. Will consider.");
        } else if(numOfFucks == 1){
          message.channel.send("One! You only give ONE fuck. You happy yet?");
        }else{
          message.channel.send("You give "+numOfFucks+" fucks.");
        }
      }

        break;

    case caseList[18]: // !havenserver
      var personID = message.author.id;
      var isBad = badPplFinder(personID);
      //console.log(isBad);
      if (isBad){
        message.channel.send("You do not have permission to use this command.");
        break;
      }
      exec('ping game.havenandhearth.com', (err,stdout,stderr) => {
        if (err){
          return;
        }
        //console.log('stdout: ${stdout}',stdout);
        // gotta parse through the message
        var pos = stdout.indexOf("Lost"); //number of index where Lost will start
        var importantPos = pos + 7;
        var numOfLosses = stdout.substr(importantPos,1);

        if (numOfLosses == "0"){
          message.channel.send("The game server seems to be responding.");
        } else if (numOfLosses == "4"){
          message.channel.send("The game server appears to be down.");
        } else {
          message.channel.send("The game server may or may not be down.");
        }
        triggers = 1;
      });

      break;

    case caseList[19]: //!doubt
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/227597884646752256/428632515939532801/e02e5ffb5f980cd8262cf7f0ae00a4a9_press-x-to-doubt-memes-memesuper-la-noire-doubt-meme_419-238.png']
      });
      // (x) doubt meme
      break;

    case caseList[20]: // !truestory
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/409071061527691266/429088221176266752/TRUESTORY.png']
      });
      //true story meme
      break;

    case caseList[21]: // !note
      client.guilds.get(botGuild.guildID).channels.get(botGuild.IsoChat).fetchMessages({limit:1})
      .then(messagesf =>{
        let mapper = messagesf.array();
        let actualMessage = mapper[0].content;
        message.channel.send("Iso "+actualMessage);

      });

      break;

    default:
      triggers = 0;
      break;
    } // ends switch
    // for putting people in jail
    if (message.content.startsWith(prefix+"bad")){
      triggers = 1;
      var name3 = message.author.id;
      if (name3 == owner){
        var badPerson = message.content.substring(5,5+18);

        var badPersonAndDesc = message.content.substring(5);


        isBad = badPplFinder(badPerson);


        if (isBad){
          // do nothing
          message.channel.send("That person is already bad.");
        } else{
          //add them to the list
          fs.appendFile('badppl.txt',badPersonAndDesc, function (err) {
              if (err) throw err;
              console.log('Saved!');
            });
        }
      }else{
        message.channel.send("You do not have permission to perform this command.");
      }
    }

    // reports on private server what was sent to the bot
    var reporttxt = " asked me ";
    var tagName = name.username;
    var badReportTxt = " tried to use ";

    //cmd
    if (triggers){
      client.guilds.get(botGuild.guildID).channels.get(botGuild.botReport).send(tagName+"/"+nameCheck+reporttxt+cmd);
    }else{

      client.guilds.get(botGuild.guildID).channels.get(botGuild.botReport).send(tagName+"/"+nameCheck+badReportTxt+cmd);
    }

});

// to log in the bot
client.login(config.token);

// Functions
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
  return i == 4 || i == 5
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
