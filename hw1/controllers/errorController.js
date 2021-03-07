const secretKeeper = require('../utils/secretKeeper')
const fetcher = require('../utils/fetcher').default

const errorController = (req, res, callback) => {
    if (req.method !== 'GET') {
        data = { success: false, error: '405 Method Not Allowed' }
        res.writeHead(405, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data), () => callback(req, res, data)) 
    } else if (req.url !== '/') {
        data = { success: false, error: '404 Not Found' }
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data), () => callback(req, res, data)) 
    } else {
        data = { success: false, error: 'Unknown error' }
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data), () => callback(req, res, data)) 
    }
}

module.exports = {
    errorController
}