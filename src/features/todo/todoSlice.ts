import { createSlice } from "@reduxjs/toolkit";

export interface ITodo {
  id: number,
  text: string,
  timestamp: Date,
}

export interface TodoState {
  todos: ITodo[]
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const {newTodo} = action.payload;
      state.todos.push(newTodo)
    },
    deleteTodo: (state, action) => {
      const {todoIndex} = action.payload;
      state.todos.splice(todoIndex, 1)
    },
    updateTodo: (state, action) => {
      const {updateIndex, updatedTodo} = action.payload;
      state.todos.splice(updateIndex, 1, updatedTodo)
    }
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
