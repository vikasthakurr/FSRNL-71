/*
=====================================================================
 NOTES: JWT (JSON Web Token) & the verification middleware
 (based on the auth flow in mongo-crud.js)
=====================================================================

 ------------------------------------------------------------------
 WHAT IS JWT?
 ------------------------------------------------------------------
 JWT (JSON Web Token) is a compact, signed token used for
 AUTHENTICATION / AUTHORIZATION. After a user logs in, the server
 gives them a token. The client sends that token back on every future
 request to PROVE who they are — without the server storing a session.

 This makes JWT auth STATELESS: the server does not keep a session in
 memory/DB; all the info needed is inside the token itself, and its
 authenticity is guaranteed by a signature.

 ------------------------------------------------------------------
 STRUCTURE OF A JWT  ->  xxxxx.yyyyy.zzzzz  (3 parts, dot-separated)
 ------------------------------------------------------------------
   1) HEADER   -> algorithm + token type   e.g. { alg:"HS256", typ:"JWT" }
   2) PAYLOAD  -> the "claims" / data you put in  (id, email, role...)
                  NOTE: payload is only base64-ENCODED, NOT encrypted.
                  Anyone can read it -> NEVER put passwords or secrets in it.
   3) SIGNATURE-> header+payload signed with a SECRET key on the server.
                  If even one character of the token changes, the
                  signature no longer matches -> token is rejected.
   The secret (process.env.JWT_SECRET) NEVER leaves the server.

 ------------------------------------------------------------------
 PART 1: CREATING A TOKEN  (jwt.sign)  -> happens at LOGIN
 ------------------------------------------------------------------
 From the /api/v1/auth/login route in mongo-crud.js:

   const token = jwt.sign(
     { id: existingUser._id, email: existingUser.email, role: "admin" }, // payload
     process.env.JWT_SECRET,                                             // secret
   )

 Flow of that login route:
   1. Find the user by email (User.findOne({ email })).
   2. Compare the plain password with the stored HASH using
      bcrypt.compare(password, existingUser.password).
      (Passwords are stored hashed via bcrypt.hash at register time,
       so we never store or compare raw passwords.)
   3. If it matches -> jwt.sign(...) creates a signed token containing
      the user's id, email and role.
   4. The token is sent to the client (here both as a cookie and in JSON).

 TIP: add an expiry so tokens don't live forever:
   jwt.sign(payload, secret, { expiresIn: "1h" })

 SENDING THE TOKEN TO THE CLIENT (two common ways, both shown):
   - Cookie: res.cookie("token", token, { httpOnly, secure, sameSite })
       * httpOnly -> JS on the page can't read it (protects against XSS).
       * secure   -> only sent over HTTPS.
       * sameSite:"strict" -> not sent on cross-site requests (CSRF help).
   - JSON body: returned so the client can store it and send it back in
       the Authorization header (which is what verifyToken expects).

 ------------------------------------------------------------------
 PART 2: THE VERIFICATION MIDDLEWARE  (verifyToken)
 ------------------------------------------------------------------
 This is the guard that protects private routes. From mongo-crud.js:

   const verifyToken = (req, res, next) => {
     const token = req.headers.authorization;               // read header
     if (!token || !token.startsWith("Bearer")) {           // must exist + be Bearer
       return res.status(401).json({ message: "token is not availble" });
     }
     const tokenValue = token.split(" ")[1];                // drop the "Bearer " prefix
     try {
       const isVerified = jwt.verify(tokenValue, process.env.JWT_SECRET);
       req.user = isVerified;   // attach decoded payload for later handlers
       next();                  // token OK -> continue to the route
     } catch (err) {
       res.status(401).json({ message: "invalid token" });  // bad/expired token
     }
   }

 STEP-BY-STEP OF WHAT IT DOES:
   1. Reads the token from the "Authorization" request header.
      Convention: "Authorization: Bearer <token>"
   2. Rejects with 401 if the header is missing or doesn't start with
      "Bearer".
   3. Splits on the space and takes index [1] -> the actual token string
      (removes the "Bearer " word).
   4. jwt.verify(tokenValue, JWT_SECRET):
        - re-checks the SIGNATURE using the same secret.
        - if valid -> returns the decoded payload (id, email, role...).
        - if tampered / expired / wrong secret -> THROWS -> caught -> 401.
   5. On success, stores the decoded payload on req.user so the actual
      route handler knows WHO is making the request.
   6. Calls next() to hand control to the protected route.

 WHY req.user MATTERS:
   Later handlers can read req.user.id / req.user.role to do
   AUTHORIZATION (e.g. "only role === 'admin' can delete users").

 ------------------------------------------------------------------
 PART 3: PROTECTING A ROUTE WITH IT
 ------------------------------------------------------------------
 verifyToken is just middleware, so you place it before the handler:

   app.get("/allusers", verifyToken, allUserLimitter, async (req, res) => { ... })

 Execution order for that route:
   request -> verifyToken (auth check)
           -> allUserLimitter (rate limit)
           -> route handler (only reached if BOTH pass)
 So: unauthenticated user  -> blocked with 401 by verifyToken.
     too many requests      -> blocked with 429 by allUserLimitter.

 ------------------------------------------------------------------
 AUTHENTICATION vs AUTHORIZATION (don't mix them up)
 ------------------------------------------------------------------
   - Authentication = WHO are you?  -> verifyToken proves identity.
   - Authorization   = are you ALLOWED?  -> check req.user.role for access.

 ------------------------------------------------------------------
 SECURITY BEST PRACTICES
 ------------------------------------------------------------------
   - Keep JWT_SECRET strong and in .env (never commit it).
   - Always set an expiry (expiresIn) on tokens.
   - Store passwords hashed (bcrypt), NEVER put them in the JWT payload.
   - Prefer httpOnly + secure cookies OR the Authorization header;
     avoid localStorage for sensitive tokens (XSS risk).
   - For logout / revocation, use short-lived access tokens + refresh
     tokens (or a server-side blocklist), since a plain JWT can't be
     "un-issued" before it expires.
=====================================================================
*/
