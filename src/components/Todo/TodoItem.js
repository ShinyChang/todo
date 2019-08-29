import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import TodoContext from '../../contexts/TodoContext';
import { toggleTodo, removeTodo } from '../../reducers/todo';

const TodoItem = ({ id }) => {
  const { state, dispatch } = useContext(TodoContext);
  const { byId } = state;
  const todo = byId[id];
  const handleChange = useCallback(() => {
    dispatch(toggleTodo(id));
  }, [todo]);
  const handleRemove = useCallback(() => {
    dispatch(removeTodo(id));
  }, [id]);
  const className = todo.completed ? 'TodoItem TodoItem--completed' : 'TodoItem';
  return (
    <li key={todo.id} className={className}>
      <label className="TodoItem__text">
        <input type="checkbox" checked={todo.completed} value={todo.id} onChange={handleChange} />
        {todo.text}
      </label>
      <button onClick={handleRemove}>&times;</button>
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired
};

export default TodoItem;
