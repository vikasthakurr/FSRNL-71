import { useContext } from "react"
import { postman } from "./App"


const Child3 = () => {
    const value=useContext(postman)
   
    
  return (
    <div>
        <h1>{value.fname}</h1>

        <h1>{value.age}</h1>
    </div>
  )
}

export default Child3