# Web Foundation Notes

## 1. What is the MERN Stack?

MERN is a popular full-stack JavaScript framework made up of four technologies:

| Letter | Technology | Role                                                 |
| ------ | ---------- | ---------------------------------------------------- |
| **M**  | MongoDB    | Database (NoSQL, stores data as JSON-like documents) |
| **E**  | Express.js | Backend framework (handles routes, APIs, middleware) |
| **R**  | React.js   | Frontend library (builds user interfaces)            |
| **N**  | Node.js    | Runtime (runs JavaScript on the server)              |

### How it all connects:

```
┌─────────────────────────────────────────────────────────┐
│                      USER (Browser)                       │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP Requests
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  REACT.JS (Frontend)                      │
│           UI Components, State Management                │
└──────────────────────────┬──────────────────────────────┘
                           │ API Calls (fetch/axios)
                           ▼
┌─────────────────────────────────────────────────────────┐
│          EXPRESS.JS + NODE.JS (Backend/Server)            │
│         Routes, Controllers, Business Logic              │
└──────────────────────────┬──────────────────────────────┘
                           │ Queries
                           ▼
┌─────────────────────────────────────────────────────────┐
│                 MONGODB (Database)                        │
│            Collections, Documents (JSON)                  │
└─────────────────────────────────────────────────────────┘
```

### Why MERN is popular:

- **One language everywhere** — JavaScript on frontend AND backend
- **Fast development** — great for startups and MVPs
- **Huge community** — tons of tutorials, packages, and support
- **JSON everywhere** — data flows naturally from DB → Server → Client

---

## 2. Monolith vs Microservices Architecture

### What is a Monolith?

A monolith is when your **entire application** lives in **one single codebase** and is deployed as **one unit**.

```
┌─────────────────────────────────────────┐
│            MONOLITH APPLICATION           │
│                                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │  Auth   │ │ Payment │ │  Orders │   │
│  │ Module  │ │ Module  │ │ Module  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │  Users  │ │  Email  │ │  Search │   │
│  │ Module  │ │ Module  │ │ Module  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                           │
│         ONE DATABASE, ONE DEPLOY          │
└─────────────────────────────────────────┘
```

**Think of it like:** A single big restaurant where one chef cooks everything — starters, mains, desserts, drinks.

### What are Microservices?

Microservices break the application into **small, independent services**. Each service does ONE thing and can be deployed separately.

```
┌──────────┐   ┌──────────┐   ┌──────────┐
│  Auth    │   │ Payment  │   │  Orders  │
│ Service  │   │ Service  │   │ Service  │
│  :3001   │   │  :3002   │   │  :3003   │
│  Own DB  │   │  Own DB  │   │  Own DB  │
└────┬─────┘   └────┬─────┘   └────┬─────┘
     │               │               │
     └───────────────┼───────────────┘
                     │
              ┌──────┴──────┐
              │ API Gateway │
              └──────┬──────┘
                     │
              ┌──────┴──────┐
              │   Client    │
              └─────────────┘
```

**Think of it like:** A food court where each stall specializes in one cuisine — one for pizza, one for sushi, one for burgers. They all work independently.

### Comparison Table:

| Factor              | Monolith                     | Microservices                        |
| ------------------- | ---------------------------- | ------------------------------------ |
| **Complexity**      | Simple to start              | Complex to set up                    |
| **Deployment**      | Deploy everything at once    | Deploy services independently        |
| **Scaling**         | Scale the whole app          | Scale only what's needed             |
| **Team Size**       | Good for small teams (1-10)  | Good for large teams (10+)           |
| **Debugging**       | Easier (one codebase)        | Harder (distributed logs)            |
| **Tech Stack**      | Same language for everything | Each service can use different tech  |
| **Failure Impact**  | One bug can crash everything | One service fails, others survive    |
| **Speed to Market** | Faster initially             | Faster for large-scale changes later |

### Which is better?

**There is no "better" — it depends on your situation:**

| Scenario                                | Best Choice                      |
| --------------------------------------- | -------------------------------- |
| Building an MVP or learning project     | ✅ Monolith                      |
| Small team (< 5 developers)             | ✅ Monolith                      |
| App with 1000s of users, multiple teams | ✅ Microservices                 |
| Netflix, Amazon, Uber scale             | ✅ Microservices                 |
| You need to ship fast                   | ✅ Monolith first, migrate later |

> 💡 **Pro Tip:** Most successful companies START as monoliths and MIGRATE to microservices when they outgrow it. Don't over-engineer from day one!

---

## 3. Horizontal Scaling vs Vertical Scaling

### What is Scaling?

Scaling means **handling more users/traffic** without your app crashing or becoming slow.

### Vertical Scaling (Scale UP) ⬆️

Add **more power** to your EXISTING machine — more RAM, better CPU, faster disk.

```
    BEFORE                    AFTER (Vertical Scaling)
┌────────────┐           ┌────────────────────┐
│   Server   │           │      Server        │
│            │           │                    │
│  2 GB RAM  │    ──►    │    32 GB RAM       │
│  1 CPU     │           │    8 CPUs          │
│  50 GB SSD │           │    1 TB SSD        │
│            │           │                    │
└────────────┘           └────────────────────┘
 (Small Box)              (BIGGER Box)
```

**Analogy:** You have a bicycle. Vertical scaling = replace it with a superbike. Same one vehicle, just more powerful.

### Horizontal Scaling (Scale OUT) ➡️

Add **more machines** (servers) and distribute the load.

```
    BEFORE                    AFTER (Horizontal Scaling)
┌────────────┐           ┌──────────┐ ┌──────────┐ ┌──────────┐
│   Server   │           │ Server 1 │ │ Server 2 │ │ Server 3 │
│            │           │  2 GB    │ │  2 GB    │ │  2 GB    │
│  2 GB RAM  │    ──►    │  1 CPU   │ │  1 CPU   │ │  1 CPU   │
│  1 CPU     │           └──────────┘ └──────────┘ └──────────┘
└────────────┘                    │         │         │
                                  └─────────┼─────────┘
                                            │
                                   ┌────────┴────────┐
                                   │  Load Balancer  │
                                   └─────────────────┘
```

**Analogy:** You have one bicycle. Horizontal scaling = buy 3 more bicycles and have friends ride them too!

### Comparison:

| Factor                      | Vertical Scaling (UP)         | Horizontal Scaling (OUT)            |
| --------------------------- | ----------------------------- | ----------------------------------- |
| **What you do**             | Upgrade the machine           | Add more machines                   |
| **Cost**                    | Expensive (high-end hardware) | Cheaper (commodity hardware)        |
| **Limit**                   | Hardware has a ceiling        | Almost unlimited                    |
| **Downtime**                | Needs restart to upgrade      | No downtime (add machines live)     |
| **Complexity**              | Simple (no code changes)      | Complex (need load balancing, etc.) |
| **Single Point of Failure** | Yes (one machine)             | No (others take over)               |
| **Best for**                | Databases, quick fixes        | Web servers, stateless apps         |

### Real-world examples:

- **Vertical Scaling:** Upgrading your database server from 16GB → 128GB RAM
- **Horizontal Scaling:** Running your Node.js app on 10 servers behind Nginx load balancer

> 💡 **In practice:** Most systems use BOTH. Scale up your database (vertical) and scale out your application servers (horizontal).

---

## 4. CAP Theorem

### What is it?

The CAP theorem says that in a **distributed system** (multiple servers), you can only guarantee **TWO out of THREE** properties at the same time:

```
                    C
                   /\
                  /  \
                 /    \
                / PICK \
               /  ANY   \
              /   TWO    \
             /____________\
            A              P
```

### The Three Properties:

| Letter | Property            | Meaning                                                                                         |
| ------ | ------------------- | ----------------------------------------------------------------------------------------------- |
| **C**  | Consistency         | Every read gets the MOST RECENT write. All nodes see the same data at the same time.            |
| **A**  | Availability        | Every request gets a response (even if it's not the latest data). System never says "I'm down." |
| **P**  | Partition Tolerance | System keeps working even if some servers CAN'T communicate with each other (network failure).  |

### Easy Analogy 🏦

Imagine you have **two bank ATMs** in different cities:

- **Consistency:** Both ATMs always show the EXACT same balance. If you deposit ₹1000 in Delhi ATM, Mumbai ATM immediately reflects it.
- **Availability:** Both ATMs are ALWAYS working. You can always check your balance or withdraw money.
- **Partition Tolerance:** Even if the network cable between Delhi and Mumbai is cut, both ATMs still function.

**The problem:** If the network between them breaks (partition happens):

- To stay **Consistent** → one ATM must stop working until connection is restored (lose Availability)
- To stay **Available** → both keep working but might show different balances (lose Consistency)

### The Three Combinations:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│   CP (Consistency + Partition Tolerance)                          │
│   ─────────────────────────────────────                          │
│   • Sacrifices: Availability                                      │
│   • Behavior: System may reject requests to stay consistent      │
│   • Examples: MongoDB, Redis, HBase                              │
│   • Use when: Correct data is critical (banking, inventory)      │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   AP (Availability + Partition Tolerance)                         │
│   ─────────────────────────────────────                          │
│   • Sacrifices: Consistency                                       │
│   • Behavior: Always responds, but data might be stale           │
│   • Examples: Cassandra, DynamoDB, CouchDB                       │
│   • Use when: Uptime matters more (social media, DNS)            │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   CA (Consistency + Availability)                                 │
│   ─────────────────────────────────                              │
│   • Sacrifices: Partition Tolerance                                │
│   • Behavior: Works perfectly but ONLY if network never fails    │
│   • Examples: Traditional RDBMS (MySQL, PostgreSQL - single node)│
│   • Reality: Not practical in distributed systems!                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Visual Decision Diagram:

```
         Is your system distributed (multiple servers)?
                         │
              ┌──── YES ─┴─ NO ────┐
              │                     │
              ▼                     ▼
    Network partitions         Use CA (traditional DB)
    WILL happen. Pick:         No partition worries!
              │
     ┌────── ┴ ──────┐
     │                │
     ▼                ▼
  Pick CP          Pick AP
  (Banking,        (Social Media,
   Inventory)       Messaging)
