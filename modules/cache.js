const cache = require('node-cache');

class Cache {
  constructor(stdTTL, checkperiod, useClones) {
    this.cache = new cache(stdTTL, checkperiod, useClones);
  }

  get(key) {
    const value = this.cache.get(key);
    if (value) {
      return value;
    }
  }

  set(key, value, ttl) {
    this.cache.set(key, value);
    if (ttl) {
      this.cache.ttl(key, ttl);
    }
  }

  del(keys) {
    this.cache.del(keys);
  }

  has(key) {
    return this.cache.has(key);
  }

  flush() {
    this.cache.flushAll();
  }
}

module.exports = new Cache(
  process.env.CACHE_TTL,
  process.env.CACHE_CHECK_PERIOD,
  process.env.CACHE_CLONES
);
