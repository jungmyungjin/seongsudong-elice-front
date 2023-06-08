import React from 'react';

import { getDate } from 'utils/getTime';
import styles from './DateInput.module.scss';

interface DateInputInterface {
  date: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFullRange: boolean;
}

function DateInput(props: DateInputInterface) {
  return (
    <div className={styles.date_div}>
      <label htmlFor='dateSelect'>날짜 선택</label>

      <input
        type='date'
        placeholder='날짜를 선택해주세요.'
        required
        value={props.date}
        onChange={props.changeHandler}
        id='dateSelect'
        min={props.isFullRange ? undefined : getDate()}
      />
    </div>
  );
}

export default DateInput;
