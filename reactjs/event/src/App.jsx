const App = () => {
  // let btn=document.querySelector("#btn")
  // btn.addEventListener("click",()=>{
  //   console.log("btn was clicked")
  // })

  const handleClick=()=>{
    console.log("hi")
  }
  return (
    <div>
      <button id="btn" onClick={handleClick}>Click me</button>
     
    </div>
  )
}

export default App