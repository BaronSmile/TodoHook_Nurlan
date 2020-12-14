import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function NewTaskForm ({onItemAdded}) {

  const [inputValue, setInputValue] = useState('')


  const onLabelChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onItemAdded(inputValue);
    setInputValue('');
  };


    return (
      <form onSubmit={onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={inputValue} />
      </form>
    );
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
