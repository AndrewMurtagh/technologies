#!/bin/bash

set users:101:name "John Doe"

get users:101:name

# sets a new value and returns the old
GETSET users:101:name "Jane Doe"

get users:102:name
# returns nil

mset users:101:name "John Doe" users:102:name "Pat Doe"

mget users:101:name users:102:name


#
# lists
#

# used in twitter, list of most recent ones
# The max length of a Redis list is 2^32 - 1 (4,294,967,295) elements
# List operations that access its head or tail are O(1),
# Consider Redis streams as an alternative to lists when you need to store and process an indeterminate series of events.
