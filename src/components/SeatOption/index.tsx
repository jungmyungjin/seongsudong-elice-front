import React from 'react';

import styles from './seatOption.module.scss';

interface SeatOptionInterface {
  zoneOption: string;
  zoneChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  seatInput: string;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SeatOption(props: SeatOptionInterface) {
  const zoneArr = ['프로그래밍', '미팅'];
  // const zoneArr = ['개인석',"팀플석(4인)", "팀플석(2인)", '미팅'];

  return (
    <div className={styles.optionDiv}>
      <label>좌석 선택</label>

      <div className={styles.selectDiv}>
        <select
          value={props.zoneOption}
          onChange={props.zoneChangeHandler}
          className={styles.select}
        >
          <option value='default'>-공간 선택-</option>
          {zoneArr.map((zone, index) => (
            <option value={zone} key={index}>
              {zone}
            </option>
          ))}
        </select>

        <input
          type='text'
          placeholder='좌석 번호를 입력해주세요.'
          className={styles.input}
          maxLength={10}
          minLength={1}
          value={props.seatInput}
          onChange={props.inputHandler}
        />
      </div>
    </div>
  );
}

export default SeatOption;
