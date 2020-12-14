import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

const TaskList = ({ tasks,filter, onDelete, onToggle, onStartEditing, onFinishEditing,editingTask}) => {
  const el = tasks.map(({ id, ...props }) => (
    <Task
      key={id}
      editing={editingTask === id}
      onEditing={!!editingTask}
      {...props}
      onDelete={() => onDelete(id)}
      onToggle={() => onToggle(id)}
      onEdit={() => onStartEditing(id)}
      onFinishEditing={(value) => onFinishEditing(id, value)}
      filter={filter}
    />
  ));

  return <ul className="todo-list">{el}</ul>;
};

TaskList.defaultProps = {
  filter: 'All',
  editingTask: null,
  tasks: [
    {
      done: false,
      editing: false,
      description: 'Example task',
      date: new Date(),
      lifeTime: 0,
      id: 300,
    },
  ],
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired,
  onFinishEditing: PropTypes.func.isRequired,
  editingTask:PropTypes.number,
  filter: PropTypes.string,
};

export default TaskList;
