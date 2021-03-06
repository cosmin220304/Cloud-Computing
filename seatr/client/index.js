const express = require("express")
const path = require("path")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(express.static(path.join(__dirname, 'build')))
app.use(cors({
  origin: "http://seatr-the-best-api.azurewebsites.net/",
  credentials: true,
}))

app.use("/api/**", (req, res) => {
  console.log('api', req.url, req.method)
  axios.get(`http://seatr-the-best-api.azurewebsites.net${req.url}`)
    .then(({ data }) => { console.log(data); res.send(data) })
    .catch((err) => { console.log(err); res.status(500) })
})

app.get("**", (req, res) => {
  console.log(req.url, req.method)
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(process.env.PORT || 5000, console.log("http://localhost:5000"))