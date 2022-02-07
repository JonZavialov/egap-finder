var getConfig = require("./getConfig.js"),
    eventInitializer = require("./eventInitializer.js"),
    fs = require("fs"),
    mineflayer = require("mineflayer"),
    Discord = require("discord.js"),
    argsList, loginList, bot, x, y, z, i, f, _mcData = require("minecraft-data");

function getMcData() {
    var d = [_mcData(bot.version).blocksByName.chest.id];
    d = bot.findBlocks({
        matching: d,
        maxDistance: 128,
        count: 10
    });
    for (i = 0; i < d.length; i++) {
        var a = d[i];
        x = a.x;
        y = a.y;
        z = a.z;
        bot.chat("/replaceitem block " + x + " " + y + " " + z + " container.1 stick 1");
        bot.chat("/data get block " + x + " " + y + " " + z)
    }
}

function processMCData(d) {
    var a = d.substring(0, d.indexOf("h") - 1);
    a = "Egap at " + a + "\n"; - 1 != d.indexOf("minecraft:enchanted_golden_apple") && fs.readFile("egaps.txt", "utf-8", function(b, e) {
        -1 == e.indexOf(a) && (bot.chat("egap found"), fs.appendFileSync("egaps.txt", a, function(c) {}))
    })
}
getConfig().then(function(d) {
    argsList = d[0];
    loginList = d[1];
    var a = argsList[0],
        b = argsList[1],
        e = 1;
    bot = mineflayer.createBot({
        host: "0.0.0.0",
        port: argsList[4],
        username: loginList[0],
        password: loginList[1]
    });
    bot.once("spawn", function() {
        eventInitializer(bot.username, a + ", " + b)
    });
    setInterval(function() {
        var c = argsList[2];
        e = 1 == e ? 2 : 1;
        "+x" == c && (b = 1 == e ? b - 256 : b + 256, a += 128);
        "-x" == c && (b = 1 == e ? b - 256 : b + 256, a -= 128);
        "+z" == c && (1 == e ? (b += 128, a -= 256) : (b += 128, a += 256));
        "-z" == c && (1 == e ? (b -= 128, a -= 256) : (b -= 128, a += 256));
        bot.chat("/tp " +
            a + " 70 " + b);
        getMcData()
    }, 5E3);
    bot.on("message", function(c) {
        c = c.toString();
        if (-1 != c.indexOf("say")) {
            var g = c.substring(c.indexOf("say") + 3);
            bot.chat(g)
        } - 1 != c.indexOf("has the following block data") && processMCData(c)
    })
}).catch(function(d) {});