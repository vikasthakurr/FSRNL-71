import { useState } from "react";

const App = () => {
  const[count,setCount]=useState(0)
 
  function handleClick(){
    setCount(count +1)
    
  }
  return (
    <div>
      <h1>the value of count is :{count}</h1>
      <h2>count is {count}</h2>
      <button onClick={handleClick}>change</button>
    </div>
  )
}

export default App


//JS logic      UI