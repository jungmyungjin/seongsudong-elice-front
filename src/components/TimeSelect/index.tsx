import React from 'react';

import styles from './timeSelect.module.scss';

interface TimeSelectInterface {
  checkedLabel: string;
  checkHandler: (e: React.MouseEvent<HTMLLabelElement>) => void;
}

function TimeSelect(props: TimeSelectInterface) {
  return (
    <div className={styles.timeDiv}>
      <label>시간 선택</label>

      <div className={styles.timeSelectDiv}>
        <label
          className={`${styles.timeOption} ${
            props.checkedLabel === 'time1014' ? styles.checkedLabel : ''
          }`}
          htmlFor='time1014'
          onClick={props.checkHandler}
        >
          <input type='radio' name='time' id='time1014' />
          10:00 ~ 14:00
        </label>

        <label
          className={`${styles.timeOption} ${
            props.checkedLabel === 'time1418' ? styles.checkedLabel : ''
          }`}
          htmlFor='time1418'
          onClick={props.checkHandler}
        >
          <input type='radio' name='time' id='time1418' />
          14:00 ~ 18:00
        </label>

        <label
          className={`${styles.timeOption} ${
            props.checkedLabel === 'time1822' ? styles.checkedLabel : ''
          }`}
          htmlFor='time1822'
          onClick={props.checkHandler}
        >
          <input type='radio' name='time' id='time1822' />
          18:00 ~ 22:00
        </label>
      </div>
    </div>
  );
}

export default TimeSelect;
