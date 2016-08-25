Requests Sent

41

Responses Received

32

Loading Finished

32

Loading Failures

3


https://developers.google.com/web/tools/chrome-devtools/profile/network-performance/understanding-resource-timing?hl=en
https://kdzwinel.github.io/debugger-protocol-viewer/tot/Network/

Network.requestWillBeSent
Network.responseReceived
Network.dataReceived
Network.loadingFinished
Network.resourceChangedPriority



connectEnd -> 65.4320000903681
,connectStart -> 32.9230000497773
,dnsEnd -> 32.9230000497773
,dnsStart -> 0.472999992780387
,proxyEnd -> -1
,proxyStart -> -1
,pushEnd -> 0
,pushStart -> 0
,receiveHeadersEnd -> 442.979000043124
,requestTime -> 538209.016431
,sendEnd -> 65.5770000303164
,sendStart -> 65.4949999880046
,sslEnd -> 65.4220000142232
,sslStart -> 37.1560000348836
,workerReady -> -1
,workerStart -> -1


rlt_url                   (params.response['url'])
rlt_method                (params.request['method'])
rlt_mediatype             (params.response['mimeType'])
rlt_request_size           loadingFinished
rlt_response_size          dataReceived



rlt_queueing
******************************
If a request is queued it indicated that:
The request was postponed by the rendering engine because it's considered lower priority 
than critical resources (such as scripts/styles). This often happens with images.
The request was put on hold to wait for an unavailable TCP socket that's about to free up.
The request was put on hold because the browser only allows six TCP connections per origin on HTTP 1.
Time spent making disk cache entries (typically very quick.)
******************************

rlt_receive		  (receiveHeadersEnd)
rlt_send                  (sendStart and sendEnd)
rlt_ssl                   (sslStart and sslEnd)
rlt_connect               (connectStart and connectEnd)
rlt_dns                   (dnsStart and dnsEnd)


rlt_wait(time to first byte)
******************************
Time spent waiting for the initial response, 
also known as the Time To First Byte. 
This time captures the latency of a round trip to 
the server in addition to the time spent waiting 
for the server to deliver the response.        
******************************

rlt_blocked
******************************
Time the request spent waiting before it could be sent.
 It can be waiting for any of the reasons described for Queueing
. Additionally, this time is inclusive of any time spent in proxy negotiation.
******************************


rlt_runtime
rlt_request_time          (params.response.timing['requestTime']) or params.request.timestamp (wallTime is UTC)   
rlt_response_time         (params.response['timestamp'])
rlt_statuscode            (params.response['status'])
pageref_url               ?