const https = require('https')
var fs = require('fs')
var qs = require('querystring')

const fetcher = {
  get: (url) => new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let chunks = ''
      res.on("data", (chunk) => chunks += chunk)
      res.on("end", () => resolve(chunks))
      res.on("error", (err) => reject(err))
    })
  }),
  post: (url, data, headers) => new Promise((resolve, reject) => {
      url = url.split('https://')[1] || url.split('http://')[1] || url
      const postData = qs.stringify(data)
      const [hostname, ...path] = url.split('/')
      const options = {
        'method': 'POST',
        'hostname': hostname,
        'path': `/${path.join('/')}`,
        'headers': {'Content-Type': 'application/x-www-form-urlencoded',  'Authorization': 'Bearer 6c21e36be508ce2de362b84c99259dbac7ac687c',},
        'maxRedirects': 20
      }
      var req = https.request(options, function (res) {
         let chunks = ''
         res.on("data", (chunk) => chunks += chunk)
         res.on("end", () => resolve(chunks))
         res.on("error", (err) => reject(err))
      })
      req.write(postData)
      req.end()
    })
}

exports.default = fetcher
 