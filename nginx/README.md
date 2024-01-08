# Nginx

Versatile web server built in 2004. Can be used for a variety of purposes and supports many protocols.

## Return static JSON

Return a JSON object:

```
nginx -c $(pwd)/misc.conf

curl http://localhost:8001/json
```

## Load balancing

Nginx can be used to load balance. Can provide a weighting to each server and different strategies for routing traffic.

Start some servers that will echo the port it is listening on:
```
port=8000 && ncat -l localhost ${port} -k -c "printf 'HTTP/1.1 200 OK\n\n%s\n' '${port}'"
port=8001 && ncat -l localhost ${port} -k -c "printf 'HTTP/1.1 200 OK\n\n%s\n' '${port}'"
port=8002 && ncat -l localhost ${port} -k -c "printf 'HTTP/1.1 200 OK\n\n%s\n' '${port}'"
port=8003 && ncat -l localhost ${port} -k -c "printf 'HTTP/1.1 200 OK\n\n%s\n' '${port}'"
```

Start Nginx to load balance across them:
```
nginx -c $(pwd)/load-balancing.conf
```

Make requests to the load balancer and note the request being handled by different servers:
```
curl http://localhost:8004
```

## Rate limiting

Uses shared memory between worker processes to track traffic.

Can handle bursts, selectively rate limit based on allowlists, can select what characteristic of the request to rate limit on.

In this example we dedicate 1mb of storage for keys and only allow 100 requests per second

```
port=8000 && ncat -l localhost ${port} -k -c "printf 'HTTP/1.1 200 OK\n\n%s\n' '${port}'"
nginx -c $(pwd)/rate-limiting.conf

siege -c 50 -t 15s http://localhost:8001
curl http://localhost:8001
```

## Denying traffic

Traffic can be denied to a location, by default it will return a 403 Forbidden HTML response.

```
nginx -c $(pwd)/misc.conf

curl http://localhost:8001/denied
```

## Add custom header to response

```
nginx -c $(pwd)/misc.conf

curl -I http://localhost:8001/json
```


## Serving static content

Serve static content from a directory.

```
mkdir /tmp/static
echo "hello world" > /tmp/static/response.txt
echo "hello world 1" > /tmp/static/response1.txt
nginx -c $(pwd)/static.conf
curl http://localhost:8001/response.txt
curl http://localhost:8001/response1.txt
```



## API gateway

```
port=8000 && ncat -l localhost ${port} -k -c "printf 'HTTP/1.1 200 OK\n\nPayments service\n'"
port=8001 && ncat -l localhost ${port} -k -c "printf 'HTTP/1.1 200 OK\n\nAuth service\n'"

nginx -c $(pwd)/api-gateway.conf

curl http://localhost:8002/payments/
curl http://localhost:8002/auth/
curl http://localhost:8002/auth/some-endpoint
```

## mTLS termination

Make a temporary resource folder:

```
mkdir /tmp/nginx-mtls
```

Generate ca private key
```
openssl genpkey -algorithm RSA -out /tmp/nginx-mtls/ca.key
```

Create a self-signed certificate authority cert
```
openssl req -new -x509 -key /tmp/nginx-mtls/ca.key -out /tmp/nginx-mtls/ca.crt
```

Create a server private key
```
openssl genpkey -algorithm RSA -out /tmp/nginx-mtls/server.key
```

Create a certifcate signing request for the server
```
openssl req -new -key /tmp/nginx-mtls/server.key -out /tmp/nginx-mtls/server.csr
```

Sign the server cert
```
openssl x509 -req -CAserial /tmp/nginx-mtls/server.srl -in /tmp/nginx-mtls/server.csr -CA /tmp/nginx-mtls/ca.crt -CAkey /tmp/nginx-mtls/ca.key -CAcreateserial -out /tmp/nginx-mtls/server.crt
```


Perform the same operations for the client
```
openssl genpkey -algorithm RSA -out /tmp/nginx-mtls/client.key
openssl req -new -key /tmp/nginx-mtls/client.key -out /tmp/nginx-mtls/client.csr
openssl x509 -req -CAserial /tmp/nginx-mtls/client.srl -in /tmp/nginx-mtls/client.csr -CA /tmp/nginx-mtls/ca.crt -CAkey /tmp/nginx-mtls/ca.key -CAcreateserial -out /tmp/nginx-mtls/client.crt
```

Start the upstream server and Nginx
```
port=8000 && ncat -l localhost ${port} -k -c "printf 'HTTP/1.1 200 OK\n\n%s\n' '${port}'"
nginx -c $(pwd)/mtls.conf
```

Make a request with the client cert and key
```
curl --cert /tmp/nginx-mtls/client.crt --key /tmp/nginx-mtls/client.key --cacert /tmp/nginx-mtls/ca.crt https://localhost:8001
```

Make a request without the client cert and key
```
curl https://localhost:8001
```



<!-- 
caching
add in headers to upstream servers
-->