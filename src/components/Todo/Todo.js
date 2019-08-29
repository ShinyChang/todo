import React, { useEffect } from 'react';

import reducer, { initialState, fetchTodos } from '../../reducers/todo';
import useThunkDispatchReducer from '../../hooks/useThunkDispatchReducer';
import TodoContext from '../../contexts/TodoContext';

import TodoFilter from './TodoFilter';
import TodoList from './TodoList';
import TodoInput from './TodoInput';

const Todo = () => {
  const [state, dispatch] = useThunkDispatchReducer(reducer, initialState);
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <h1>Todo List</h1>
      <TodoFilter />
      <TodoList />
      <TodoInput />
    </TodoContext.Provider>
  );
};
export default Todo;
