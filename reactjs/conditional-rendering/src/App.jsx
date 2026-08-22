import Dashboard from "./Dashboard";
import Login from "./Login";
const App = () => {
  let isLoggedIn = true;
  // let age=18;
  return (
    <div>
      {/* {
        if(age>18 && isLoggedIn===true)
      } */}
      <h1>{isLoggedIn ? <Dashboard /> : <Login />}</h1>
    </div>
  );
};

export default App;
