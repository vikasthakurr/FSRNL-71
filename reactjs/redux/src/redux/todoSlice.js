import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        text: action.payload.text,
        completed: false,
      };
      state.push(newTodo);
    },
    // deleteTodo:(state,action)=>{
    //     //TODO for delete.....
    // },
    // updateTodo:(state,action)=>{
    //     //logic

    // },
    removeAll: () => {
      return [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, removeAll } = todoSlice.actions;

export default todoSlice.reducer;
