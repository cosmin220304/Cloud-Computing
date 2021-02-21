const fs = require('fs')
const path = require('path') 

const publicController = (req, res, callback) => {
    fs.readFile(path.resolve(__dirname, `../public${req.url}`), (error, content) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/html' })
            res.end(error, () => callback(req, res, error)) 
        } else {
            res.writeHead(200, { 'Content-Type': 'image/png' })
            res.end(content, () => callback(req, res, `${req.url} base64 image`)) 
        }
    })
}  

module.exports = {
    publicController
}