import UseCustom from "./UseCustom"

const App = () => {
  const[data]=UseCustom("https://dummyjson.com/products/1")
  console.log(data)
  return (
    <div>
      {/* <h1>{data.title}</h1> */}
      
    </div>
  )
}

export default App