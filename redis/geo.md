# geo


```
GEOADD bikes:rentable -122.27652 37.805186 station:1

GEOSEARCH bikes:rentable FROMLONLAT -122.2612767 37.7936847 BYRADIUS 5 km WITHDIST

GEOADD Sicily 13.361389 38.115556 "Palermo" 15.087269 37.502669
GEODIST Sicily Palermo Catania
GEORADIUS Sicily 15 37 200 km

```