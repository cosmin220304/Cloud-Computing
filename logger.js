fs = require('fs')

const writeLog = (content) => {
    fs.appendFile('file.log', content, err => {
        if (err) {
            console.error(err)
            return
        }
    })
}

process.on('message', (log) => {
    writeLog(JSON.stringify(log) + ",")
})