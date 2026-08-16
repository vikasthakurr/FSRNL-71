import { useCallback, useMemo, useState } from "react";
import Child from "./Child";

function App() {
  const [count, setCount] = useState(0);

  const [count1, setCount1] = useState(0);

  function calculate() {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  }
  let res = useMemo(() => calculate(), []);

  function sayHi(){
    console.log("hi")
  }
  let sayHi1=useCallback(()=>sayHi(),[])

  return (
    <>
      <h1>the value of sum is:{res}</h1>
      <h1>the value of count is :{count}</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        change for parent
      </button>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={() => setCount1((count1) => count1 + 1)}>
        change for child
      </button>
      <Child count1={count1} sayHi={sayHi1} />
    </>
  );
}

export default App;
