// ============================================================
// React Virtualization & React Query - Notes
// ============================================================

// ============================================================
// 1. WHAT IS VIRTUALIZATION?
// ============================================================

// Virtualization (also called "windowing") is a technique used to
// efficiently render large lists or datasets in the UI.
//
// Problem:
//   - Rendering thousands of DOM elements (e.g., 10,000 list items)
//     causes performance issues: slow initial render, high memory usage,
//     janky scrolling, and unresponsive UI.
//
// Solution:
//   - Only render the items that are VISIBLE in the viewport.
//   - As the user scrolls, items entering the viewport are rendered,
//     and items leaving the viewport are removed from the DOM.
//
// Benefits:
//   - Significantly reduces the number of DOM nodes at any given time
//   - Faster initial render
//   - Lower memory consumption
//   - Smooth scrolling performance
//
// Popular Libraries for Virtualization in React:
//   - react-window (lightweight, recommended for most cases)
//   - react-virtualized (feature-rich, heavier)
//   - @tanstack/react-virtual (headless, flexible)

// ============================================================
// 2. HOW VIRTUALIZATION WORKS
// ============================================================

// Without Virtualization:
//   <div>
//     <div>User 1</div>
//     <div>User 2</div>
//     ...
//     <div>User 10000</div>   <!-- All 10,000 items in the DOM -->
//   </div>

// With Virtualization:
//   <div style="height: 500px; overflow: auto">
//     <div style="height: 300000px">  <!-- Total scrollable height -->
//       <!-- Only 10-20 visible items rendered -->
//       <div style="position: absolute; top: 1500px">User 51</div>
//       <div style="position: absolute; top: 1530px">User 52</div>
//       ...
//     </div>
//   </div>

// ============================================================
// 3. REACT QUERY (@tanstack/react-query)
// ============================================================

// React Query is a powerful data-fetching and state management library
// for server state in React applications.
//
// Why React Query?
//   - Simplifies data fetching logic (no more useEffect + useState combos)
//   - Automatic caching of server responses
//   - Background re-fetching (keeps data fresh)
//   - Built-in loading, error, and success states
//   - Pagination and infinite scroll support
//   - Automatic retry on failure
//   - Window focus re-fetching
//   - Optimistic updates
//
// Installation:
//   npm install @tanstack/react-query

// ============================================================
// 4. REACT QUERY - SETUP
// ============================================================

// Step 1: Create a QueryClient instance
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// const queryClient = new QueryClient();

// Step 2: Wrap your app with QueryClientProvider
// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <YourComponent />
//     </QueryClientProvider>
//   );
// }

// ============================================================
// 5. REACT QUERY - useQuery HOOK
// ============================================================

// useQuery is used to fetch and cache data.
//
// Syntax:
//   const { data, isPending, error } = useQuery({
//     queryKey: ["uniqueKey"],       // Unique identifier for caching
//     queryFn: () => fetchFunction() // Function that returns a promise
//   });
//
// Parameters:
//   - queryKey: An array that uniquely identifies the query.
//               React Query uses this for caching and refetching.
//               Example: ["users"], ["user", userId], ["posts", { page: 1 }]
//
//   - queryFn: An async function that fetches the data.
//              Must return a promise that resolves with data or throws an error.
//
// Return Values:
//   - data       : The resolved data from queryFn
//   - isPending  : true while the query is loading (no cached data)
//   - isLoading  : true on initial load (alias for isPending in v5)
//   - error      : Error object if the query failed
//   - isError    : Boolean flag for error state
//   - isSuccess  : Boolean flag for success state
//   - refetch    : Function to manually trigger a re-fetch

// ============================================================
// 6. EXAMPLE - FETCHING USERS WITH useQuery
// ============================================================

// import { useQuery } from "@tanstack/react-query";
//
// const UserList = () => {
//   const { isPending, error, data } = useQuery({
//     queryKey: ["users"],
//     queryFn: () =>
//       fetch("https://jsonplaceholder.typicode.com/users")
//         .then((res) => res.json()),
//   });
//
//   if (isPending) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;
//
//   return (
//     <ul>
//       {data.map((user) => (
//         <li key={user.id}>{user.name}</li>
//       ))}
//     </ul>
//   );
// };

// ============================================================
// 7. REACT QUERY - CACHING BEHAVIOR
// ============================================================

// - Queries are cached using the queryKey.
// - If a component re-mounts and the cache is still fresh,
//   React Query returns cached data immediately (no network request).
// - Default cache time (gcTime): 5 minutes
// - Default stale time: 0 (data is considered stale immediately)
//
// Customizing:
//   useQuery({
//     queryKey: ["users"],
//     queryFn: fetchUsers,
//     staleTime: 1000 * 60 * 5,  // Data stays fresh for 5 minutes
//     gcTime: 1000 * 60 * 10,    // Cache kept for 10 minutes after inactive
//   });

// ============================================================
// 8. COMBINING VIRTUALIZATION + REACT QUERY
// ============================================================

// A common pattern is:
//   1. Fetch a large dataset using React Query (handles caching & loading)
//   2. Render the data using a virtualized list (handles performance)
//
// This gives you:
//   - Efficient data fetching with caching
//   - Smooth rendering even with thousands of items
//   - Great user experience with minimal code

// ============================================================
// 9. KEY DIFFERENCES: SERVER STATE vs CLIENT STATE
// ============================================================

// Server State (React Query handles this):
//   - Data that lives on the server (users, posts, products)
//   - Can be outdated, needs syncing
//   - Shared across the app
//   - Examples: API responses, database records
//
// Client State (useState/useReducer/Redux handles this):
//   - Data that lives only in the browser
//   - Always up-to-date locally
//   - Examples: form inputs, modal open/close, theme preference

// ============================================================
// 10. SUMMARY
// ============================================================

// Virtualization:
//   - Renders only visible items in a list
//   - Dramatically improves performance for large datasets
//   - Libraries: react-window, react-virtualized, @tanstack/react-virtual
//
// React Query:
//   - Manages server state (fetching, caching, syncing)
//   - Provides useQuery for data fetching
//   - Handles loading, error, and success states automatically
//   - Caches responses and refetches in the background
//   - QueryClient + QueryClientProvider for setup
//   - queryKey for cache identification, queryFn for fetching logic
