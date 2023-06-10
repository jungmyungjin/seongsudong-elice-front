import React from 'react';

import { ReactComponent as Chair } from 'assets/Chair.svg';
import styles from './numberInput.module.scss';

interface NumberInputInterface {
  placeholder: string;
  inputValue: string;
  inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired: boolean;
  zoneState: string;
}

function NumberInput(props: NumberInputInterface) {
  return (
    <div className={styles.inputDiv}>
      <Chair className={styles.icon} />

      <input
        type={props.zoneState === '미팅룸' ? 'text' : 'number'}
        placeholder={props.placeholder}
        required={props.isRequired ? true : false}
        className={styles.seatInput}
        value={props.inputValue}
        onChange={props.inputChangeHandler}
      />
    </div>
  );
}

export default NumberInput;
