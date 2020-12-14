import React, { useState, useEffect } from 'react';
import './stopwatch.css';

import PropTypes from 'prop-types';

export default function Stopwatch({ done }) {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [hour, setHour] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isActive) {

      if(done){
        setIsActive(false)
      }

      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        const hourCounter = Math.floor(minuteCounter / 60);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
        const computedHour =
          String(hourCounter).length === 1
            ? `0${hourCounter}`
            : hourCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);
        setHour(computedHour);

        // eslint-disable-next-line no-shadow
        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter,done]);


  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond('00');
    setMinute('00');
    setHour('00');
  }

  let stopwatchBtnClass = 'stopwatch';

  if (done) {
    stopwatchBtnClass += ' disabled';
  }

  const runClass = isActive ? 'pause' : 'start';

  return (
    <div className={stopwatchBtnClass}>
      <span>
        {hour}:{minute}:{second}
      </span>
      <div className='buttons'>
        <button type='button' aria-label='Start_Pause' onClick={() => setIsActive(!isActive)} className={runClass} />
        <button type='button' aria-label='Reset' onClick={stopTimer} className='reset' />
      </div>
    </div>
  );
}
Stopwatch.propTypes = {
  done: PropTypes.bool.isRequired,
};