import{ memo } from "react"


const Child = () => {
  console.log("child component called")
  return (
    <div>Child</div>
  )
}

export default memo(Child)