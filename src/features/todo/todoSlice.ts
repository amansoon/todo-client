import { createSlice } from "@reduxjs/toolkit";

export interface ITodo {
  _id: string,
  todoId: string,
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
    setTodos: (state, action) => {
      const { todos } = action.payload;
      state.todos = todos;
    },
    addTodo: (state, action) => {
      const { todo } = action.payload;
      state.todos.push(todo);
    },
    deleteTodo: (state, action) => {
      const { todoIndex } = action.payload;
      state.todos.splice(todoIndex, 1)
    },
    updateTodo: (state, action) => {
      const { updateIndex, todo } = action.payload;
      state.todos.splice(updateIndex, 1, todo)
    }
  },
});

// Action creators are generated for each case reducer function
export const { setTodos, addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
