import React from 'react';

import ZoneOption from 'components/SeatOption/ZoneOption';
import NumberInput from './NumberInput';

import styles from './seatNumberInput.module.scss';

interface SeatNumberInputInterface {
  zoneOption: string;
  zoneChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  seatStartNumber: string;
  seatStartHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  seatEndNumber: string;
  seatEndHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SeatNumberInput(props: SeatNumberInputInterface) {
  return (
    <div className={styles.seatDiv}>
      <label>
        좌석 선택
        <span className={styles.seatNotice}>
          단일 좌석일 경우 왼쪽에만 입력해주세요.
        </span>
      </label>

      <div className={styles.seatOption}>
        <ZoneOption
          zoneOption={props.zoneOption}
          changeHandler={props.zoneChangeHandler}
        />

        <div className={styles.seatNumberDiv}>
          <NumberInput
            zoneState={props.zoneOption}
            placeholder='시작 좌석 번호'
            inputValue={props.seatStartNumber}
            inputChangeHandler={props.seatStartHandler}
            isRequired={true}
          />

          <span className={styles.span}>~</span>

          <NumberInput
            zoneState={props.zoneOption}
            placeholder='끝 좌석 번호'
            inputValue={props.seatEndNumber}
            inputChangeHandler={props.seatEndHandler}
            isRequired={false}
          />
        </div>
      </div>
    </div>
  );
}

export default SeatNumberInput;
