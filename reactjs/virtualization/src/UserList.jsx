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

import { QueryClient, QueryClientProvider,useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App(){
    return (
        <QueryClientProvider client={queryClient}>
            <UserList />
        </QueryClientProvider>
    )
}


const UserList = () => {
  return (
    <div>UserList</div>
  )
}

export default UserList
