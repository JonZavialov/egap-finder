const fs = require('fs')

function getConfig() {
  const dataPromise = new Promise(function(resolve, reject) {
    fs.readFile('config.json', 'utf-8', (err, jsonString) =>{

          if (err) reject(err)
/////////////////////////////////////////////////////////////////
          else {
          const config = JSON.parse(jsonString)
          const baseX = config.args.startX
          const baseY = config.args.startY
          const dir = config.args.direction
          const renderDist = config.args.renderDistance
          const port = config.args.port
          
          const user = config.login.username
          const password = config.login.password
          resolve([[baseX,baseY,dir,renderDist,port],[user,password]])/*poarp*/
          }

        })
///////////////////////////////////////////////////
  })
    

  return dataPromise
}

module.exports = getConfig
