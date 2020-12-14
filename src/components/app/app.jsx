import React, { useState } from 'react';

import './app.css';
import Header from '../header/header';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default function App() {

  let maxId = 1;

  const createItem = (description) => {
    return {
      description,
      done: false,
      date: new Date(),
      id: maxId++,
    };
  };

  const initialData = [createItem('Completed task'), createItem('Editing task'), createItem('Active task')];

  const [todoData, setTodoData] = useState(initialData);
  const [filter, setFilter] = useState('All');
  const [editingTask, setEditingTask] = useState(null);

  const findIdx = (arr, id) => arr.findIndex((el) => el.id === id);

  const getNewArr = (arr, idx, newItem) => {
    if (!newItem) {
      return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const toggleItemProperty = (arr, id, propName) => {
    const idx = findIdx(arr, id);
    const newItem = { ...arr[idx], [propName]: !arr[idx][propName] };
    return getNewArr(arr, idx, newItem);
  };

  const setItemProperty = (arr, id, propName, newValue) => {
    const idx = findIdx(arr, id);
    const newItem = { ...arr[idx], [propName]: newValue };
    return getNewArr(arr, idx, newItem);
  };


  const getItemProperty = (arr, id, propName) => {
    const idx = findIdx(arr, id);
    return arr[idx][propName];
  };

  const deleteItem = (id) => {
    setTodoData((data) => {
      const idx = findIdx(data, id);
      return (getNewArr(data, idx)
      );
    });
  };

  const clearCompletedItems = () => {
    todoData.forEach((item) => {
      if (item.done) deleteItem(item.id);
    });
  };

  const toggleDone = (id) => {
    setTodoData((data) => toggleItemProperty(data, id, 'done'));
  };

  // eslint-disable-next-line no-unused-vars
  const closeEditingInput = (id) => {
    setEditingTask(null);
  };

  const editItemDescription = (id, value) => {
    setTodoData((data) => setItemProperty(data, id, 'description', value));
    closeEditingInput(id);
  };

  const openEditingInput = (id) => {
    const done = getItemProperty(todoData, id, 'done');

    if (!done && !editingTask) {
      setEditingTask(id);
    }
  };


  const addItem = (text) => {
    if (!text) return;

    const newItem = createItem(text);
    setTodoData((data) => [...data, newItem]);
  };

  const changeFilter = (value) => {
    setFilter(value);
  };

  const undoneItemsCount = todoData.filter((el) => !el.done).length;

  return (
    <section className='todoapp'>
      <Header onItemAdded={addItem} />
      <section className='main'>

        <TaskList
          tasks={todoData}
          filter={filter}
          onDelete={deleteItem}
          onToggle={toggleDone}
          onFinishEditing={editItemDescription}
          onStartEditing={openEditingInput}
          editingTask={editingTask}
        />
        <Footer
          counter={undoneItemsCount}
          onChangeFilter={changeFilter}
          onClearCompletedClick={clearCompletedItems}
        />
      </section>
    </section>
  );

}