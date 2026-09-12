import express, { json } from "express";
import { createClient } from "redis";

const app = express();
const redisClient = createClient();
redisClient.on("error", (err) => console.error("Redis Client Error", err));

async function startServer() {
  await redisClient.connect();

  app.get("/users", async (req, res) => {
    const cachedUser = await redisClient.get("users");

    if (cachedUser) {
      console.log("data is coming from redis cache");
      return res.json({ users: JSON.parse(cachedUser), source: "redis" });
    }

    console.log("now data is coming from db query");

    const users = [
      { id: 1, name: "vikas" },
      { id: 2, name: "akash" },
      { id: 3, name: "vimal" },
    ];

    await redisClient.set("users", JSON.stringify(users), {
      EX: 60,
    });

    return res.json({ users, source: "db" });
  });

  app.listen(3000, () => {
    console.log("server is running");
  });
}
startServer();

/*
=====================================================================
 NOTES: Redis, Caching & CDN (in detail)
=====================================================================

 ------------------------------------------------------------------
 PART 1: WHAT IS CACHING?
 ------------------------------------------------------------------
 Caching = storing a COPY of frequently-needed data in a fast location
 so future requests are served quickly WITHOUT redoing expensive work
 (like a slow database query or an API call).

 Why cache?
   - Speed:   memory reads are far faster than disk / DB queries.
   - Less load: fewer hits on the database -> DB stays healthy.
   - Scale:   handle more users with the same DB.
   - Cost:    fewer expensive DB / compute operations.

 The trade-off: cached data can become STALE (out of date), so we must
 decide how long to keep it and when to refresh/remove it.

 ------------------------------------------------------------------
 PART 2: WHAT IS REDIS?
 ------------------------------------------------------------------
 Redis = REmote DIctionary Server. An in-memory, key-value data store.
   - In-memory  -> extremely fast (data lives in RAM).
   - Key-value  -> you store data under a "key" (like "users") and read
                   it back by that key.
   - Values     -> Redis only stores strings/binary, so objects must be
                   JSON.stringify()'d in and JSON.parse()'d out
                   (exactly what this file does).
   - Data types -> strings, lists, sets, hashes, sorted sets, etc.
   - Common uses -> caching, session storage, rate limiting, queues,
                    leaderboards, pub/sub.

 ------------------------------------------------------------------
 PART 3: THE CACHE-ASIDE PATTERN (what THIS file demonstrates)
 ------------------------------------------------------------------
 Flow of the GET /users route above:
   1. Try the cache first:
        const cachedUser = await redisClient.get("users")
   2. CACHE HIT -> data exists in Redis:
        parse it and return immediately (source: "redis").  ->  FAST path
   3. CACHE MISS -> not in Redis:
        - run the "real" work (here a fake DB array; normally a DB query)
        - store the result in Redis for next time:
            await redisClient.set("users", JSON.stringify(users), { EX: 60 })
        - return the fresh data (source: "db").             ->  SLOW path

 This "check cache -> else hit DB -> then fill cache" pattern is called
 CACHE-ASIDE (lazy loading): the cache is filled only when data is asked
 for and wasn't already cached.

 ------------------------------------------------------------------
 PART 4: TTL / EXPIRY  ({ EX: 60 })
 ------------------------------------------------------------------
   { EX: 60 } sets a TTL (Time To Live) of 60 SECONDS on the key.
   - After 60s Redis auto-deletes "users" -> next request is a cache MISS
     -> fresh data is fetched and re-cached.
   - TTL is how we fight STALE data: short TTL = fresher but more DB hits,
     long TTL = faster but data can be outdated.
   Related options: PX (ms), EXAT/PXAT (absolute expire time), NX/XX.

 KEY REDIS COMMANDS (node-redis v4 client used here)
 ------------------------------------------------------------------
   createClient()                 -> create a client (defaults to localhost:6379)
   client.connect()               -> must await before using (async)
   client.on("error", ...)        -> handle connection errors
   client.set(key, value, {EX})   -> store a value (+ optional expiry)
   client.get(key)                -> read a value (null if missing/expired)
   client.del(key)                -> delete a key (use to INVALIDATE cache
                                     right after the DB is updated)
   client.expire(key, seconds)    -> set/refresh TTL on an existing key

 CACHE INVALIDATION (important!)
 ------------------------------------------------------------------
   When the underlying data changes (e.g. a user is added/updated), the
   cached "users" key is now WRONG. Fix it by either:
     - deleting the key:   await redisClient.del("users")   (re-fetched next time)
     - or overwriting it with the new value via set().
   "There are only two hard things in CS: cache invalidation and naming."

 ------------------------------------------------------------------
 PART 5: CDN (Content Delivery Network) — caching on the edge
 ------------------------------------------------------------------
 A CDN is a global network of servers ("edge" servers) that cache and
 serve mostly STATIC content (images, CSS, JS, videos, fonts) from a
 location physically CLOSE to the user.

 How it helps:
   - Lower latency: a user in India is served from an India edge server
     instead of a single origin server in, say, the US.
   - Less origin load: the CDN answers most requests; your server only
     handles cache MISSES (similar idea to Redis, but for static files
     and geographically distributed).
   - Reliability + DDoS protection + bandwidth savings.

 CDN vs REDIS (both are caches, different jobs):
   - Redis  -> caches DYNAMIC data (DB results, sessions) close to your
               SERVER, in memory. Great for API responses like this file.
   - CDN    -> caches STATIC assets close to the USER, across the globe.
   In real apps you use BOTH: CDN for files, Redis for data.

 CDN caching controls:
   - Cache-Control / Expires HTTP headers tell the CDN how long to cache.
   - "Cache busting": add a version/hash to filenames (app.abc123.js) so
     updating a file forces the CDN + browser to fetch the new version.
   - Popular CDNs: Cloudflare, AWS CloudFront, Fastly, Akamai.

 ------------------------------------------------------------------
 QUICK MENTAL MODEL
 ------------------------------------------------------------------
   Browser cache  -> on the user's device
   CDN edge cache -> static files, near the user, worldwide
   Redis cache    -> dynamic data, near/at your server, in RAM
   Database       -> source of truth (slowest, hit only on cache miss)
   Requests flow left-to-right and stop at the first place that has the data.
=====================================================================
*/
