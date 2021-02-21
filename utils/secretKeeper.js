fs = require('fs')
const readline = require('readline')
 
const secrets = {}
const config = async () => {
    const fileStream = fs.createReadStream('./secrets')
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    }); 

    for await (const line of rl) {
      [key, secret] = line.split('=')  
      secrets[key] = secret
    }
} 
   
module.exports = {
  config,
  secrets,
}