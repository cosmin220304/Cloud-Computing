const fs = require('fs')
const path = require('path') 

const viewController = (req, res, callback) => {
    fs.readFile(path.resolve(__dirname, '../views/index.html'), 'utf8', (error, content) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(error, () => callback(req, res, error)) 
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(content, () => callback(req, res, 'index.html file')) 
        }
    })
}  

module.exports = {
    viewController
}