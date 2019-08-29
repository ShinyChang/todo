import React, { useCallback, useContext } from 'react';

import { setFilter } from '../../reducers/todo';
import TodoContext from '../../contexts/TodoContext';

const filters = [
  { name: 'All', value: 'all' },
  { name: 'Active', value: 'active' },
  { name: 'Completed', value: 'completed' }
];

const TodoFilter = () => {
  const { state, dispatch } = useContext(TodoContext);
  const handleChange = useCallback(value => {
    dispatch(setFilter(value));
  }, []);
  return (
    <div className="TodoFilter">
      {filters.map(({ name, value }) => {
        const className = state.filter === value ? 'TodoFilter__label TodoFilter__label--active' : 'TodoFilter__label';
        return (
          <label key={value} className={className}>
            <input
              type="radio"
              value="all"
              checked={state.filter === value}
              onChange={handleChange.bind(this, value)}
            />
            {name}
          </label>
        );
      })}
    </div>
  );
};

export default TodoFilter;
