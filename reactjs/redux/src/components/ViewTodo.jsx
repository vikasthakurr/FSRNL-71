import { useSelector } from "react-redux"

const ViewTodo = () => {
    const todos=useSelector((state)=>state.todo)
    console.log(todos)
  return (
    <div>
        {/* {todos.map((ele)=>{
            return <h1 key={ele.id}>{ele}</h1>
        })} */}
    </div>
  )
}

export default ViewTodo