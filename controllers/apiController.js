const secretKeeper = require('../utils/secretKeeper')
const fetcher = require('../utils/fetcher').default

const consumeKanyeApi = async () => {
  const response = await fetcher.get('https://api.kanye.rest/')
  const { quote } = await JSON.parse(response)
  return quote
}

const consumeYodaApi = async (text) => {
  const response = await fetcher.post("https://api.funtranslations.com/translate/yoda.json", {
    "text": text
  })
  const { contents } = await JSON.parse(response)
  return contents.translated
}

const consumeSentimentAnalysisApi = async (text) => {
  await secretKeeper.config()
  const response = await fetcher.post('https://apis.paralleldots.com/v4/sentiment', {
    'api_key': secretKeeper.secrets.PARALLELDOTS_KEY,
    'text': text
  })
  const { sentiment } = await JSON.parse(response)

  let maxx = 0;
  let returnedValue = ''
  for (let s of Object.keys(sentiment)) {
    if (sentiment[s] > maxx) {
      maxx = sentiment
      returnedValue = s
    }
  }
  return returnedValue
}

const apiController = async (req, res, callback) => {
  try {
    const kanyeQuote = await consumeKanyeApi()
    const yodaQuote = await consumeYodaApi(kanyeQuote)
    const sentiment = await consumeSentimentAnalysisApi(kanyeQuote)

    const data = { kanyeQuote, yodaQuote, sentiment }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(data), () => callback(req, res, data)) 

  } catch (err) {
    const data = { 
      kanyeQuote: 'Too many requests', 
      yodaQuote: 'Too many requests',
      sentiment: 'negative'
    }
    res.writeHead(429, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(data), () => callback(req, res, data)) 
  }
}

module.exports = {
  apiController
}