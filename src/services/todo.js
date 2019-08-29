const KEY = '__todo';

const defaultValues = [{ id: 1, text: 'Todo #1', completed: false }, { id: 2, text: 'Todo #2', completed: true }];

let mockData;
try {
  mockData = JSON.parse(localStorage.getItem(KEY)) || defaultValues;
} catch (e) {
  // restore mock data
  mockData = defaultValues;
  localStorage.setItem(KEY, JSON.stringify(mockData));
}

export const getTodos = () => {
  // deep clone data
  return Promise.resolve(JSON.parse(JSON.stringify(mockData)));
};

export const toggleTodo = id => {
  return new Promise(resolve => {
    const data = mockData.find(data => data.id === id);
    data.completed = !data.completed;
    localStorage.setItem(KEY, JSON.stringify(mockData));
    resolve();
  });
};

export const createTodo = text => {
  return new Promise(resolve => {
    const id = mockData.length ? mockData[mockData.length - 1].id + 1 : 1;
    const todo = { id, text, completed: false };
    mockData.push(todo);
    localStorage.setItem(KEY, JSON.stringify(mockData));

    // deep clone data
    resolve(JSON.parse(JSON.stringify(todo)));
  });
};

export const removeTodo = id => {
  return new Promise(resolve => {
    const index = mockData.findIndex(data => data.id === id);
    mockData = [...mockData.slice(0, index), ...mockData.slice(index + 1)];
    localStorage.setItem(KEY, JSON.stringify(mockData));
    resolve();
  });
};
