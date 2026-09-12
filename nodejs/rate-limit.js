import { rateLimit } from "express-rate-limit";

const message = {
  success: false,
  message: "too many request from this IP.. please try after given time",
};

export const allUserLimitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1,
  message: message,
});

export const singleUserLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: message,
});

/*
=====================================================================
 NOTES: Rate Limiting (in detail)
=====================================================================

 WHAT IS RATE LIMITING?
 -----------------------------------------------------
 Rate limiting = restricting HOW MANY requests a client (usually
 identified by IP) can make to your server within a given TIME WINDOW.
 If the client exceeds the limit, further requests are blocked (usually
 with HTTP status 429 "Too Many Requests") until the window resets.

 WHY DO WE NEED IT?
 -----------------------------------------------------
   1. Prevent abuse / spam       -> stop bots hammering your API.
   2. Security                   -> slow down brute-force login / OTP guessing.
   3. Protect the server         -> avoid overload and keep it responsive.
   4. Prevent DoS / DDoS damage  -> limit flood of requests from one source.
   5. Fair usage                 -> one user can't hog all the resources.
   6. Cost control               -> fewer wasteful DB / 3rd-party API calls.

 THE express-rate-limit PACKAGE (used in this file)
 -----------------------------------------------------
 It creates MIDDLEWARE that counts requests per client and blocks
 when the limit is crossed. Key options:

   windowMs -> the time window in MILLISECONDS.
               15 * 60 * 1000  = 15 minutes.
   max      -> max requests allowed PER IP within that window.
   message  -> response body sent once the limit is exceeded.

 Other useful options (not used here but good to know):
   statusCode        -> status when blocked (default 429).
   standardHeaders   -> send RateLimit-* headers so clients see limits.
   legacyHeaders     -> older X-RateLimit-* headers (usually false).
   keyGenerator      -> customize how a client is identified (default = IP).
   skip              -> function to bypass limiting for certain requests.
   store             -> where counts are kept (default = in-memory; use a
                        Redis store for multi-server / production setups).

 THE TWO LIMITERS DEFINED IN THIS FILE
 -----------------------------------------------------
   allUserLimitter  -> window 15 min, max 1
                       => only 1 request per IP every 15 minutes.
                       (very strict — good for heavy/expensive endpoints,
                        e.g. "fetch all users").
   singleUserLimiter -> window 15 min, max 5
                       => 5 requests per IP every 15 minutes.
                       (a bit looser — e.g. fetching a single user).

 Both share the same "message" object returned on block:
     { success: false, message: "too many request from this IP..." }

 HOW TO USE THEM (they are exported as middleware)
 -----------------------------------------------------
   import { allUserLimitter, singleUserLimiter } from "./rate-limit.js"

   // apply to a specific route:
   app.get("/api/users", allUserLimitter, handler)
   app.get("/api/users/:id", singleUserLimiter, handler)

   // or apply globally to every route:
   app.use(allUserLimitter)

 IMPORTANT NOTES
 -----------------------------------------------------
   - Default store is IN-MEMORY, so counts reset on server restart and
     are NOT shared across multiple server instances. For production
     with several servers, use a shared store (e.g. rate-limit-redis)
     so the limit is enforced globally.
   - If your app is behind a proxy / load balancer, set
     app.set("trust proxy", 1) so req.ip is the real client IP, not the
     proxy's IP (otherwise everyone shares one limit).
   - Rate limiting is often paired with caching (Redis) and CORS as part
     of an API's protective middleware layer.

 RELATED ALGORITHMS (how limits are counted, conceptually)
 -----------------------------------------------------
   - Fixed Window   : count resets fully at the end of each window (simple,
                      what a basic limiter does).
   - Sliding Window : smoother, considers a rolling time range.
   - Token Bucket   : tokens refill over time; each request spends one;
                      allows short bursts.
   - Leaky Bucket   : requests processed at a steady drain rate.
=====================================================================
*/
