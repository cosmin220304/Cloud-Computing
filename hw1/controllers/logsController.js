const fs = require('fs')
const path = require('path') 

const logsController = (req, res, callback) => {
    fs.readFile(path.resolve(__dirname, '../file.log'), 'utf8', (error, content) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(error, () => callback(req, res, error)) 
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            const data = `${content}]`
            res.end(data, () => callback(req, res, 'file.log'))
        }
    })
}  

module.exports = {
    logsController
}