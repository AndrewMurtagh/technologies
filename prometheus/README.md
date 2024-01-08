# prometheus


Systems monitoring and alerting built at SoundCloud in 2012.

- PromQL language for querying.
- Client libraries for instrumenting application code.
- Can push to it through a push gateway
- An alert manager for defining and handling alerts
- Stores scraped samples locals and can run rules over the data to aggregate it
- Each Prometheus server is standalone binary.
- It is used for collecting metrics, not event logging.
- Apache 2.0.
- Commonly paired with Grafana
- Everything is in Unix time.
- Tonnes of pre-built exporters already exist.
- Prometheus servers poll data from HTTP endpoints on instances that should be instrumented.
- An endpoint that can be scraped is an _instance_, a collection of instances with the same purpose is a _job_.
- There are options for mTLS, OAuth 2.0 and basic auth. 

**Data model**
- Time series data identified by metric name and key/value pairs (called _labels_).
- Metric names are in the form: `<metric name>{<label name>=<label value>, ...}` e.g. `api_http_requests_total{method="POST", handler="/messages"}`.

- There are 4 metric types. Prometheus flattens all types and stores them as untyped time-series.

-- Counter
Monotonically increasing counter. Can be reset on a restart. 
E.g. Tasks completed, errors, requests served, etc.


-- Gauge
Numeric value that can increase or decrease.
E.g. Number of concurrent requests, memory usage, logged in users, running processes, etc.

-- Histogram
Samples observations and counts them in configurable buckets, as well as providing a sum of all observations. One time-series per bucket.
E.g. Request durations, response sizes,

-- Summary
Very similar to histograms with some differences: operates on sliding window, calculates quantiles on the client, cannot be aggregatable, needs more configuration on the client.



**Alerting**
- Alertmanager is used to manage alerts (silencing, deduping, multiple channels, etc.)
- Runs as a separate process.
- Tonnes of receiver channels exist (Discord, PagerDuty, Slack, Email, etc.)



## Links

[Exporters](https://prometheus.io/docs/instrumenting/exporters/)
[Prometheus vs. alternatives](https://prometheus.io/docs/introduction/comparison/)
[Logs and Metrics and Graphs, Oh My!](https://grafana.com/blog/2016/01/05/logs-and-metrics-and-graphs-oh-my/)

## Tutorial


```
docker run \
    -p 9090:9090 \
    -v $(pwd)/config.yaml:/etc/prometheus/prometheus.yml \
    prom/prometheus
```

