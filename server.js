const http = require('http')
const { fork } = require('child_process')
const { controller } = require('./controllers') 

const logger = fork('./logger.js')
const callback = (req, res, body) => {
  const { rawHeaders, httpVersion, method, socket, url, timerStart } = req
  const { remoteAddress, remoteFamily } = socket
  const { statusCode, statusMessage } = res
  const headers = res.getHeaders()
  
  timeElapsed = process.hrtime(timerStart).join('.')
  const loggedData = {
    request: { rawHeaders, httpVersion, method, remoteAddress, remoteFamily, url },
    response: { statusCode, statusMessage, headers, body: body },
    latency: `${timeElapsed}s`
  } 
  logger.send(loggedData) 
}

http.createServer((req, res) => {
  req.timerStart = process.hrtime() 

  if (req.method === "GET" && req.url === "/") {
    controller.view(req, res, callback)
  } else if (req.method === "GET" && req.url === "/api/yodaQuote") {
    controller.api(req, res, callback)
  } else if (req.method === "GET" && req.url.includes("yoda.jpg")) {
    controller.public(req, res, callback)
  } else if (req.method === "GET" && req.url === "/metrics") {
    controller.logs(req, res, callback)
  } else {
    controller.error(req, res, callback)
  }
}).listen(8001)

console.log('Server running at http://127.0.0.1:8001')