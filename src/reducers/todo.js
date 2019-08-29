import { arrayToByKey, arrayToKeys } from '../utils/reducer';
import * as todo from '../services/todo';

export const initialState = { filter: 'all', byId: {}, ids: [] };

export const LOAD_TODOS = 'LOAD_TODOS';
export const TOGGOLE_TODO = 'TOGGOLE_TODO';
export const SET_FILTER = 'SET_FILTER';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

export default (state, action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        ids: arrayToKeys(action.payload, 'id'),
        byId: arrayToByKey(action.payload, 'id')
      };
    case TOGGOLE_TODO:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            completed: !state.byId[action.payload.id].completed
          }
        }
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };
    case ADD_TODO:
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload
        }
      };
    case REMOVE_TODO: {
      const ids = state.ids.filter(id => id !== action.payload.id);
      return {
        ...state,
        ids,
        byId: ids.reduce((acc, cur) => {
          acc[cur] = state.byId[cur];
          return acc;
        }, {})
      };
    }
    default:
      return state;
  }
};

export const fetchTodos = () => todo.getTodos().then(todos => ({ type: LOAD_TODOS, payload: todos }));
export const toggleTodo = id => todo.toggleTodo(id).then(() => ({ type: TOGGOLE_TODO, payload: { id } }));
export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
export const createTodo = text => todo.createTodo(text).then(todo => ({ type: ADD_TODO, payload: todo }));
export const removeTodo = id => todo.removeTodo(id).then(() => ({ type: REMOVE_TODO, payload: { id } }));
