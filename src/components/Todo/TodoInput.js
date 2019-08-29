import React, { useCallback, useContext, useRef } from 'react';

import TodoContext from '../../contexts/TodoContext';
import { createTodo } from '../../reducers/todo';

const TodoInput = () => {
  const { dispatch } = useContext(TodoContext);
  const inputRef = useRef();
  const handleCreate = useCallback(
    e => {
      e.preventDefault();
      dispatch(createTodo(inputRef.current.value));
      inputRef.current.value = '';
    },
    [dispatch]
  );
  return (
    <form className="TodoInput" onSubmit={handleCreate}>
      <input className="TodoInput__input" ref={inputRef} type="text" placeholder="What needs to be done?" required />
      <button type="submit">Create</button>
    </form>
  );
};

export default TodoInput;
