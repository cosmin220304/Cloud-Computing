import requests
import sys
import multiprocessing
import re

batches = int((sys.argv[1]))
parallel_requests = int((sys.argv[2]))

def apiCall():
    global batches
    for _ in range(batches):
        response =  requests.get("http://127.0.0.1:8001/api/yodaQuote")
   
if __name__ == '__main__': 
    jobs = []
    for _ in range(parallel_requests):
        p = multiprocessing.Process(target=apiCall)
        jobs.append(p)
        p.start() 

    for job in jobs:
        job.join()

    response = requests.get("http://127.0.0.1:8001/metrics") 
    metrics = re.findall(r"latency\":\"(\d).(\d+)", response.text)[-batches*parallel_requests:]
    time = []
    for touple in metrics:
        time += [float(f'{touple[0]}.{touple[1]}')]

    avg = lambda arr: 0 if len(arr) == 0 else sum(arr)/len(arr)
    print('Min execution time: ', min(time), 's')
    print('Max execution time: ', max(time), 's')
    print('Avg execution time: ', avg(time), 's') 