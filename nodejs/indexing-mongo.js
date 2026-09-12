/*
=====================================================================
 NOTES: MongoDB Indexing & Aggregation Pipeline (in detail)
 (examples use the User model from mongo-crud.js:
  { username, email, password })
=====================================================================

 ##################################################################
 PART A: INDEXING
 ##################################################################

 WHAT IS AN INDEX?
 -----------------------------------------------------
 An index is a special data structure (MongoDB uses a B-tree) that
 stores a SORTED reference to a field's values, so the database can
 FIND documents fast instead of scanning the whole collection.

 Analogy: the index at the back of a book. To find a topic you jump
 to the right page via the index, instead of reading every page.

 THE PROBLEM IT SOLVES: COLLECTION SCAN
 -----------------------------------------------------
   Without an index, a query like  User.findOne({ email })  forces a
   COLLECTION SCAN (COLLSCAN): MongoDB checks EVERY document one by one.
   Fine for 100 docs, terrible for 10 million.
   With an index on "email", MongoDB does an INDEX SCAN (IXSCAN) and
   jumps straight to the match -> huge speed-up.
   (In mongo-crud.js, login and register both query by email, so an
    index on email is a great fit + it enforces uniqueness.)

 CREATING INDEXES (Mongoose)
 -----------------------------------------------------
   // in the schema definition:
   const userSchema = new mongoose.Schema({
     username: String,
     email: { type: String, unique: true, index: true }, // unique index
     password: String,
   })

   // or explicitly:
   userSchema.index({ email: 1 })            // 1 = ascending, -1 = descending
   userSchema.index({ username: 1, email: 1 })// COMPOUND index (two fields)

   // raw driver equivalent:
   db.users.createIndex({ email: 1 }, { unique: true })

 TYPES OF INDEXES
 -----------------------------------------------------
   - Single field   -> { email: 1 }
   - Compound       -> { username: 1, email: 1 }  (order of fields matters!)
   - Unique         -> forbids duplicate values (great for email).
   - Text           -> { username: "text" } for text search on strings.
   - Hashed         -> for hashed sharding.
   - TTL            -> auto-DELETES docs after N seconds
                       ({ createdAt: 1 }, { expireAfterSeconds: 3600 }) —
                       handy for OTPs, sessions, temporary data.
   - _id index      -> every collection has one on _id automatically.

 COMPOUND INDEX RULE (prefix rule)
 -----------------------------------------------------
   An index { username: 1, email: 1 } can serve queries on:
     - { username }                (uses the left "prefix")
     - { username, email }
   but NOT an { email } only query. Put the field you filter on most,
   or filter on first, at the LEFT.

 CHECKING IF AN INDEX IS USED
 -----------------------------------------------------
   Query.explain("executionStats")  -> look at the "stage":
     - IXSCAN  = index was used  (good)
     - COLLSCAN = full scan       (missing/unused index)

 TRADE-OFFS (indexes are not free)
 -----------------------------------------------------
   + Much faster reads / sorts / filters on indexed fields.
   - Extra disk space to store the index.
   - Slower writes: every insert/update/delete must also update indexes.
   -> Index the fields you actually query/sort by, not every field.

 ##################################################################
 PART B: AGGREGATION PIPELINE
 ##################################################################

 WHAT IS AGGREGATION?
 -----------------------------------------------------
 Aggregation = processing documents through a PIPELINE of STAGES to
 compute results (grouping, totals, averages, joins, reshaping).
 Think of it like an assembly line: documents flow in, each STAGE
 transforms them, and the output of one stage is the input of the next.

 SYNTAX
 -----------------------------------------------------
   Model.aggregate([ stage1, stage2, stage3, ... ])
   Each stage is an object starting with a "$" operator.

 THE MOST COMMON STAGES
 -----------------------------------------------------
   $match   -> filter documents (like find / WHERE). Put it EARLY so
               later stages process fewer docs. Uses indexes if first.
       { $match: { role: "admin" } }

   $group   -> group docs by a key and compute aggregates.
       { $group: { _id: "$role", total: { $sum: 1 } } }
       // count users per role
       // accumulators: $sum, $avg, $min, $max, $push, $addToSet, $first

   $project -> choose / rename / compute fields (shape the output).
       { $project: { _id: 0, username: 1, email: 1 } }

   $sort    -> order results.   { $sort: { createdAt: -1 } }  (newest first)

   $limit / $skip -> pagination.  { $skip: 10 }, { $limit: 10 }

   $count   -> count the documents that reached this stage.
       { $count: "totalUsers" }

   $lookup  -> JOIN with another collection (e.g. users + their orders).
       {
         $lookup: {
           from: "orders",          // other collection
           localField: "_id",       // field on THIS collection
           foreignField: "userId",  // matching field on the other
           as: "orders",            // array field to attach results
         }
       }

   $unwind  -> flatten an array field into one document per element
               (often used after $lookup).
       { $unwind: "$orders" }

   $addFields / $set -> add computed fields to each document.

 EXAMPLE PIPELINE (count users per role, admins first)
 -----------------------------------------------------
   User.aggregate([
     { $match: { email: { $exists: true } } },        // 1. filter
     { $group: { _id: "$role", total: { $sum: 1 } } },// 2. group + count
     { $sort:  { total: -1 } },                        // 3. sort desc
     { $project: { role: "$_id", total: 1, _id: 0 } }, // 4. reshape
   ])

 EXAMPLE PIPELINE (join users with their orders)
 -----------------------------------------------------
   User.aggregate([
     { $match: { _id: someUserId } },
     { $lookup: { from:"orders", localField:"_id",
                  foreignField:"userId", as:"orders" } },
     { $project: { username:1, email:1, orderCount:{ $size:"$orders" } } },
   ])

 PIPELINE BEST PRACTICES
 -----------------------------------------------------
   - Put $match (and $sort) as EARLY as possible so an INDEX can be used
     and fewer documents flow down the pipeline.
   - $project away fields you don't need to reduce memory.
   - $lookup and large $group stages are heavy — index the join/match
     fields to keep them fast.

 ------------------------------------------------------------------
 HOW INDEXING + AGGREGATION RELATE
 ------------------------------------------------------------------
   Indexing speeds up FINDING documents (the $match at the start of a
   pipeline, and normal find queries). Aggregation TRANSFORMS/summarizes
   them. Used together: a well-indexed $match feeds a fast pipeline.
=====================================================================
*/
