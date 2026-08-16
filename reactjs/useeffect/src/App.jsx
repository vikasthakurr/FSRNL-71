import { useEffect, useLayoutEffect, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  //sample api call

  useLayoutEffect(()=>{

  },[])

  useEffect(() => {
    console.log("component mounted");
  }, []);
  //empty array-> only run on mounting
  useEffect(() => {
    console.log("component updated");

    return () => {
      console.log("component  unmounted");
    };
  }, [count]);

  const handleChange = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1>the value of count is :{count}</h1>
      <button onClick={handleChange}>change</button>
    </div>
  );
};

export default App;
