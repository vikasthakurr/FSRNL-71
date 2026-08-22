import { useState } from "react";
import { addTodo, removeAll } from "../redux/todoSlice";
import { useDispatch } from "react-redux";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleClick = () => {
    dispatch(addTodo({ text: todo }));
  };

  const handleClear = () => {
    dispatch(removeAll());
  };

  return (
    <div>
      <input
        value={todo}
        onChange={handleChange}
        placeholder="enter your task"
        type="text"
      />
      <button onClick={handleClick}>AddTodo</button>
      <button onClick={handleClear}>clearAll</button>
    </div>
  );
};

export default AddTodo;
