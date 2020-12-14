import React, { useState } from 'react';

import TasksFilterButton from '../tasks-filter-button/tasks-filter-button';

// eslint-disable-next-line react/prop-types
export default function TasksFilter({onChangeFilter}) {


  const [selectedFilter, setSelectedFilter] = useState('All');
  const filtersBtn = ['All', 'Active', 'Completed'];

  const changeSelectedButton = (evt) => {
    const { name } = evt.target;
    setSelectedFilter(() => {
      onChangeFilter(name);
      return { selected: name };
    });
  };

  const elements = filtersBtn.map(( name ) => {
    const className = name === selectedFilter ? 'selected' : '';
    return <TasksFilterButton className={className} name={name} key={name} onFilterBtn={changeSelectedButton}/>;
  });

  return <ul className='filters'>{elements}</ul>;

}


