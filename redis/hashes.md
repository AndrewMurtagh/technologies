# hashes

# set a model
```
hset bike:1 model Deimos brand Ergonom type 'Enduro bikes' price 4972
```

# get value of key
```
hget bike:1 brand
```

# set value of a key
```
HSET bike:1 brand Ergonom
```

# get all keys and value
```
hgetall bike:1
```

# get multiple values
```
hmget bike:1 model price no-such-field
```

# increment
```
hincrby bike:1 price 100
```


# delete field in model
```
HDEL bike:1 brand
```

# get all keys in model
```
hkeys bike:1
```

# get all values in model
```
hvals bike:1
```

# get random key for model
```
hrandfield bike:1
```

# delete model
```
del bike:1
```
