/*
=====================================================================
 NOTES: Cookies (in detail)
=====================================================================

 WHAT IS A COOKIE?
 -----------------------------------------------------
 A cookie is a small piece of data (key=value) that the SERVER sends to
 the BROWSER, and the browser automatically STORES it and sends it BACK
 with every future request to that same site.

 Why they exist: HTTP is STATELESS (the server forgets you after each
 request). Cookies let the server "remember" a client between requests
 — e.g. keep a user logged in, remember a cart, store preferences.

 THE FLOW (how a cookie travels)
 -----------------------------------------------------
   1. Server responds with a header:  Set-Cookie: token=abc123
   2. Browser saves it.
   3. On every next request to that site the browser auto-adds:
        Cookie: token=abc123
   4. Server reads it and knows who the client is.
   (You do NOT manually attach cookies on the client — the browser does.)

 COMMON USES
 -----------------------------------------------------
   - Authentication  -> store a session id or JWT (see mongo-crud.js).
   - Sessions        -> keep a user "logged in" across pages.
   - Personalization -> theme, language, preferences.
   - Tracking/analytics.

 SETTING A COOKIE IN EXPRESS
 -----------------------------------------------------
   res.cookie(name, value, options)

 Example straight from the /login route in mongo-crud.js:
   res.cookie("token", token, {
     httpOnly: true,
     secure: true,
     sameSite: "strict",
   })

 COOKIE OPTIONS EXPLAINED
 -----------------------------------------------------
   httpOnly : true
       -> the cookie CANNOT be read by client-side JavaScript
          (document.cookie). Protects the token from XSS attacks.
          Use this for auth tokens.

   secure : true
       -> cookie is only sent over HTTPS, never plain HTTP.
          (On localhost/dev without HTTPS this can stop it being set,
           so it's often false in development.)

   sameSite : "strict" | "lax" | "none"
       -> controls whether the cookie is sent on CROSS-SITE requests.
          Helps prevent CSRF attacks.
          * "strict" -> only sent for same-site requests (most secure).
          * "lax"    -> sent on top-level navigations (a good default).
          * "none"   -> sent cross-site, but then "secure" MUST be true.

   maxAge : milliseconds
       -> how long until the cookie expires, e.g. maxAge: 24*60*60*1000
          (1 day). Without maxAge/expires it's a SESSION cookie that
          dies when the browser closes.

   expires : Date
       -> absolute expiry date (alternative to maxAge).

   path / domain
       -> which URLs/domains the cookie applies to (default path "/").

   signed : true
       -> cookie is signed so tampering can be detected (needs a secret
          via cookie-parser: app.use(cookieParser("secret"))).

 READING COOKIES (server side)
 -----------------------------------------------------
 Express does NOT parse incoming cookies by default. Use cookie-parser:
     import cookieParser from "cookie-parser"
     app.use(cookieParser())
     // then:
     app.get("/me", (req, res) => {
       const token = req.cookies.token   // read the "token" cookie
       ...
     })
   - req.cookies       -> normal cookies
   - req.signedCookies -> cookies set with { signed: true }

 CLEARING / LOGOUT
 -----------------------------------------------------
     res.clearCookie("token")   // removes the cookie -> logs the user out

 COOKIES vs OTHER STORAGE
 -----------------------------------------------------
   - Cookie        -> sent to server automatically on every request;
                      can be httpOnly (safe for auth); size limit ~4KB.
   - localStorage  -> stays in browser, NOT sent to server automatically;
                      readable by JS (XSS risk) -> avoid for auth tokens.
   - sessionStorage-> like localStorage but cleared when the tab closes.

 SECURITY QUICK CHECKLIST (for auth cookies)
 -----------------------------------------------------
   [x] httpOnly: true   -> block JS access (anti-XSS)
   [x] secure: true     -> HTTPS only (in production)
   [x] sameSite         -> "strict"/"lax" (anti-CSRF)
   [x] set an expiry    -> maxAge / expires
   [x] don't store sensitive raw data (store a token/session id instead)
=====================================================================
*/
