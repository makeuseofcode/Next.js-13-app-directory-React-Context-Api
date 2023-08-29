"use client"

import React, { createContext, useReducer } from "react";

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "DELETE_TODO":
      return { ...state, todos: state.todos.filter((todo, index) => index !== action.payload) };
    case "EDIT_TODO":
      const updatedTodos = state.todos.map((todo, index) => index === action.payload.index ? action.payload.newTodo : todo);
      return { ...state, todos: updatedTodos };
    default:
      return state;
  }
};

export const TodoContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
