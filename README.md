# tiny-filo
Tiny FILO cache for Client or Server

[![build status](https://secure.travis-ci.org/avoidwork/tiny-filo.svg)](http://travis-ci.org/avoidwork/tiny-filo)

```javascript
const cache = filo(max, ttl = 0);
```

## clear
### Method

Clears the contents of the cache

	return {Object} FILO instance

**Example**

```javascript
cache.clear();
```

## delete
### Method

Removes item from cache

	param  {String} key Item key
	return {Object}     FILO instance

**Example**

```javascript
cache.delete("myKey");
```

## evict
### Method

Evicts the last item from cache

	return {Object} FILO instance

**Example**

```javascript
cache.evict();
```

## get
### Method

Gets item in cache

	param  {String} key Item key
	return {Mixed}      Undefined or Item value

**Example**

```javascript
const item = cache.get("myKey");
```

## keys
### Method

Returns an `Array` of cache item keys.

	return {Array} Array of keys

**Example**

```javascript
console.log(cache.keys());
```

## max
### Property

Max items to hold in cache (1000)

**Example**

```javascript
const cache = filo(500);

cache.max; // 500
```

## set
### Method

Sets item in cache

	param  {String} key   Item key
	param  {Mixed}  value Item value
	return {Object}       FILO instance

**Example**

```javascript
cache.set("myKey", {prop: true});
```

## size
### Property

Number of items in cache

**Example**

```javascript
const cache = filo();

cache.size; // 0 - it's a new cache!
```

## ttl
### Property

Milliseconds an item will remain in cache; lazy expiration upon next `get()` of an item

**Example**

```javascript
const cache = filo();

cache.ttl = 3e4;
```

## License
Copyright (c) 2019 Jason Mulligan
Licensed under the BSD-3 license.
