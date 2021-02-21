# Cloud-Computing Homework1

Info about API:  
-consumes 3 external APIs ( second uses the first, and third uses the second)  
-logs requests, responses and latency  

## Kanye Quotes API:
url: https://api.kanye.rest/  
example result:  
```json
{"quote":"George Bush doesn't care about black people"}  
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
        "translated": "George bush doesn't care about black people",  
        "text": "George Bush doesn't care about black people",  
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
        "negative":0.725,  
        "neutral":0.234,  
        "positive":0.041  
    }  
}
```  
