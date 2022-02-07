const getConfig = require('./getConfig.js');
const eventInitializer = require('./eventInitializer.js')
const fs = require('fs')
const mineflayer = require("mineflayer")
const Discord = require('discord.js');
let argsList
let loginList
let bot
let x
let y
let z
let i
let f
const _mcData = require('minecraft-data')

function getMcData(){
  const mcData = _mcData(bot.version)
  const ids = [mcData.blocksByName["chest"].id]
  const blocks = bot.findBlocks({ matching: ids, maxDistance: 128, count: 10 })
  for (i = 0; i < blocks.length; i++) {
    var singleChest = blocks[i]
    x = singleChest.x
    y = singleChest.y
    z = singleChest.z
    var commandGenContents = "/replaceitem block " + x + " " + y + " " + z + " container.1 stick 1"
    bot.chat(commandGenContents)
    var commandGetContents = "/data get block " + x + " " + y + " " + z
    bot.chat(commandGetContents)
  }
}

function processMCData(dataDict){
  var egapAt = dataDict.substring(0,dataDict.indexOf('h')-1)
  egapAt = "Egap at " + egapAt + "\n"
  if(dataDict.indexOf("minecraft:enchanted_golden_apple") != -1){
    fs.readFile('egaps.txt', 'utf-8', (err, jsonString) => {
      if(jsonString.indexOf(egapAt) != -1){
        return
      }
      else{
        bot.chat('egap found')
        fs.appendFileSync('egaps.txt',egapAt, err => {})
      }
    })
  }
}

getConfig()
.then((data) => {  
  argsList = data[0]
  loginList = data[1]
  var currentLocX = argsList[0]
  var currentLocZ = argsList[1]
  var interval = 1
  
  bot = mineflayer.createBot({
    host: '0.0.0.0',
    port: argsList[4],
    username: loginList[0],
    password: loginList[1]
  });
  
  const welcome = () => {
    var coords = currentLocX+ ", " + currentLocZ
    eventInitializer(bot.username,coords)
  };

  bot.once('spawn', (welcome));

  setInterval(()=>{
    var dir = argsList[2]
    if(interval == 1){
      interval = 2
    }
    else{
      interval = 1
    }

    if(dir == '+x'){
      if (interval == 1){
        currentLocZ-=256
        currentLocX+=128
      }
      else{
        currentLocZ+=256
        currentLocX+=128
      }
    }
    if(dir == "-x"){
      if (interval == 1){
        currentLocZ-=256
        currentLocX-=128
      }
      else{
        currentLocZ+=256
        currentLocX-=128
      }
    }
    if(dir == "+z"){
      if (interval == 1){
        currentLocZ+=128
        currentLocX-=256
      }
      else{
        currentLocZ+=128
        currentLocX+=256
      }
    }
    if(dir == "-z"){
      if (interval == 1){
        currentLocZ-=128
        currentLocX-=256
      }
      else{
        currentLocZ-=128
        currentLocX+=256
      }
    }
    bot.chat("/tp " + currentLocX + " 70 " + currentLocZ)
    getMcData()
  },5000)

  bot.on('message', (message) => {  
    var msg = message.toString()
    //console.log(msg)
    if(msg.indexOf("say") != -1){
      var sayString = msg.substring(msg.indexOf('say') + 3)
      bot.chat(sayString)
    }
    if(msg.indexOf("has the following block data") != -1){
      processMCData(msg)
    }
  })
})
.catch((err) => {
  // if err
})