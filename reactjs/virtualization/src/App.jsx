// const UserList = ({ data }) => {
//   // console.log(data)
//   return (
//     <div>
//       {data.map((user) => (
//         <div key={user.id}>{user.name}</div>
//       ))}
//     </div>
//   );
// };

// export default UserList;

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}

const UserList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json(),
      ),
  });
  if (isPending) return "loading the data please wait....";
  if (error) return "an error is there" + error.message;
  return (
    <div>
      <h1>{data.name}</h1>
      <h1>{data.username}</h1>
    </div>
  );
};
