const fs = require('fs')
const path = require('path') 

const publicController = (req, res, callback) => {
    fs.readFile(path.resolve(__dirname, `../public${req.url}`), (error, content) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(error, () => callback(req, res, error)) 
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(content, () => callback(req, res, `${req.url} as base64 image`)) 
        }
    })
}  

module.exports = {
    publicController
}