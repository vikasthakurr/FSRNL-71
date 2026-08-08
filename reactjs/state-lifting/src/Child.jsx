const Child = (props) => {

    function handleChange(e){
        props.setName(e.target.value)

    }
  return (
    <div>
        <input type="text" placeholder="enter username" onChange={handleChange} />
    </div>
  )
}

export default Child