import React, { useContext } from 'react';

import TodoContext from '../../contexts/TodoContext';

import TodoItem from './TodoItem';

const TodoList = () => {
  const { state } = useContext(TodoContext);
  const { ids, byId, filter } = state;
  return (
    <ul className="TodoList">
      {ids
        .filter(id => {
          return (
            filter === 'all' ||
            (filter === 'active' && !byId[id].completed) ||
            (filter === 'completed' && byId[id].completed)
          );
        })
        .map(id => (
          <TodoItem key={id} id={id} />
        ))}
    </ul>
  );
};
export default TodoList;
