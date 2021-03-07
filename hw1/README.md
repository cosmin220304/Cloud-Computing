# Cloud-Computing Homework 1

Create an application that provides results from at least three different web
services. Use or implement a system that allows (at least): monitoring of running
web services, concurrent number of requests, logging requests/responses.
Observation: The third web service must use the results from previous two.

# Additional Information:
the application should have both a client side and a server side, which means
that a minimal web interface is required;
- the web interface will be provider by the server and it will be used to send the
requests
- the communication logic between web services will be implemented in the
web server component;
- logging requests/responses: each call will log at least the following
information: request, response, latency (response time)
- monitoring of running web services: a /metrics API route should be
provided by the web server, which aggregates data obtained through logging
the api calls and the requests received in the web server;
- concurrent number of requests: create a script that sends a number of
parallel requests in batches (e.g. 500 requests in batches of 50 parallel
requests) and draws out some metrics about the behaviour of your API;

## Kanye Quotes API:
url: https://api.kanye.rest/  
example result:  
```json
{"quote":"I hate when I'm on a flight and I wake up with a water bottle next to me like oh great now I gotta be responsible for this water bottle"}  
```

## Yoda Translate API: 
url: https://api.funtranslations.com/translate/yoda.json  
example result:   
```json
{  
    "success": {  
        "total": 1  
    },  
    "contents": {  
        "translated": "When I 'm on a flight and I wake up with a water bottle next to me like oh great now I gotta be responsible for this water bottle,  I hate",  
        "text": "I hate when I'm on a flight and I wake up with a water bottle next to me like oh great now I gotta be responsible for this water bottle",  
        "translation": "yoda"  
    }  
}  
```

## Sentiment Analysis API (requires API-key): 
url: https://apis.paralleldots.com/v4/sentiment   
example result:
```json
{  
    "sentiment": { 
        "negative": 0.767,
        "neutral": 0.142,
        "positive": 0.091
    }  
}
```  

# Resulting response:
```json
{
    "kanyeQuote": "I hate when I'm on a flight and I wake up with a water bottle next to me like oh great now I gotta be responsible for this water bottle",
    "yodaQuote": "When I 'm on a flight and I wake up with a water bottle next to me like oh great now I gotta be responsible for this water bottle,  I hate",
    "senimtent": "negative"
}
```
