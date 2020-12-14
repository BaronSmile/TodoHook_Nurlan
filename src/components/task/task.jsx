import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Stopwatch from '../stopwatch/stopwatch';

export default function Task({
                               done,
                               editing,
                               onEditing,
                               date,
                               description,
                               filter,
                               onDelete,
                               onEdit,
                               onToggle,
                               onFinishEditing,
                             }) {


  const [taskDescription, setTaskDescription] = useState(description);
  const [taskDate, setTaskDate] = useState('less than 1 second');
  const inputEl = useRef(null);

  const ENTER_KEYCODE = 13;
  const ESC_KEYCODE = 27;
  const SPACE_KEYCODE = 32;

  useEffect(() => {
    const dateInterval = setInterval(() => {
      setTaskDate(formatDistanceToNow(date, { includeSeconds: true }));
    }, 1000);
    return () => clearInterval(dateInterval);
  }, [date]);

  useEffect(() => {
    if (editing) inputEl.current.focus();
  }, [editing]);

  const setVisible = () => {
    let visible;

    switch (filter) {
      case 'Active':
        visible = !done;
        break;
      case 'Completed':
        visible = done;
        break;
      default:
        visible = true;
    }
    return visible;
  };

  const editDescription = (event) => {
    setTaskDescription(event.target.value);
  };

  const finishEditing = (evt) => {
    const newValue = evt.target.value.trim();

    if (evt.keyCode === ESC_KEYCODE) {
      onFinishEditing(description);
      setTaskDescription(description);
    }
    if (evt.keyCode === ENTER_KEYCODE && newValue !== '') {
      onFinishEditing(newValue);
    }
  };

  const onKeyUp = (evt) => {
    if (evt.keyCode === SPACE_KEYCODE) {
      onToggle();
    }
  };

  const startEditing = () => {
    onEdit();
  };

  let classEditButton = 'icon icon-edit';
  let classList = '';

  if (done) {
    classList += 'completed';
    classEditButton += ' disabled';
  }
  if (onEditing) classEditButton += ' disabled';
  if (editing) classList += ' editing';
  if (!setVisible()) classList += ' hidden';

  return (
    <li className={classList}>
      <div className='view'>
        <input id='checkTask' className='toggle' type='checkbox' onChange={onToggle} checked={done} />
        <label htmlFor='checkTask'>
          <button type='button' onClick={onToggle} onKeyUp={onKeyUp}>
              <span className='description' role='menuitem'>
                {taskDescription}
              </span>
            <span className='created'>{taskDate}</span>
          </button>
        </label>
        <Stopwatch done={done} />
        <button type='button' className={classEditButton} onClick={startEditing}>
          <span>edit</span>
        </button>
        <button type='button' className='icon icon-destroy' onClick={onDelete}>
          <span>close</span>
        </button>
      </div>
      {editing ? (
        <input
          ref={inputEl}
          type='text'
          className='edit'
          value={taskDescription}
          onChange={editDescription}
          onKeyUp={finishEditing}
        />
      ) : null}
    </li>
  );

}

Task.defaultProps = {
  done: false,
  editing: false,
  date: new Date(),
  description: 'New Task',
  filter: 'All',
};

Task.propTypes = {
  done: PropTypes.bool,
  editing: PropTypes.bool,
  onEditing: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date),
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onFinishEditing: PropTypes.func.isRequired,
  description: PropTypes.string,
  filter: PropTypes.string,
};
