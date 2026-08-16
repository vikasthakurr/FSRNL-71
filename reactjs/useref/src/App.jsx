import { useEffect, useRef, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const ref = useRef(0);
  //  const ref1=useRef(<h1>vikas</h1>)
  //  console.log(ref1)
  const ref1 = useRef();
  useEffect(() => {
    ref1.current.style.backgroundColor = "red";
  });

  const handClick = () => {
    setCount(count + 1);
    ref.current = ref.current + 1;
    // console.log(a)
    console.log(ref.current);
  };
  return (
    <div>
      <h1 ref={ref1}>the value of count:{count}</h1>

      <button onClick={handClick}>change</button>
    </div>
  );
};

export default App;
