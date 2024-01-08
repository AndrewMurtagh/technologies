# Redis

# SET

A Redis set is an unordered collection of unique strings (members). You can use Redis sets to efficiently:

Track unique items (e.g., track all unique IP addresses accessing a given blog post).

Represent relations (e.g., the set of all users with a given role).
Perform common set operations such as intersection, unions, and differences.


SADD adds a new member to a set.

SREM removes the specified member from the set.

SISMEMBER tests a string for set membership.

SINTER returns the set of members that two or more sets have in common (i.e., the intersection).

SCARD returns the size (a.k.a. cardinality) of a set.


```
SADD bikes:racing:usa bike:1
SADD bikes:racing:usa bike:1
SADD bikes:racing:usa bike:2 bike:3

SISMEMBER bikes:racing:usa bike:1

SREM bikes:racing:usa bike:1
SCARD bikes:racing:usa

SMEMBERS bikes:racing:usa
```

# list everything
```
KEYS *
```

```
DEL bikes:racing:usa
```
