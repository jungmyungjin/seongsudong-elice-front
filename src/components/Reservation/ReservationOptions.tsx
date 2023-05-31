import React, { useState } from 'react';
import styles from './ReservationOptions.module.scss';
import SeatLayout from 'components/Reservation/SeatLayout';

interface typeInfo {
  value: string;
}

interface CreateTypeSelectorProps {
  typeList: typeInfo[];
  onSelect: (value: string) => void;
}

const CreateTypeSelector: React.FC<CreateTypeSelectorProps> = ({
  typeList,
  onSelect,
}) => {
  const [typeSelector, setTypeSelector] = useState(typeList[0].value);

  const handleButtonClick = (value: string) => {
    setTypeSelector(value);
    onSelect(value);
  };

  return (
    <div className={styles.typeContainer}>
      {typeList.map(type => (
        <button
          key={type.value}
          className={
            typeSelector === type.value
              ? styles.checkedType
              : styles.unCheckedType
          }
          onClick={() => handleButtonClick(type.value)}
        >
          {type.value}
        </button>
      ))}
    </div>
  );
};

const ReservationOptions: React.FC = () => {
  const seatTypeList = [
    { value: '개인석' },
    { value: '팀플석' },
    { value: '수료기수석' },
    { value: '미팅룸' },
  ];

  const TimeList = [
    { value: '10:00~14:00' },
    { value: '14:00~18:00' },
    { value: '18:00~22:00' },
  ];

  const [selectedSeatType, setSelectedSeatType] = useState(
    seatTypeList[0].value,
  );

  const handleSeatTypeSelect = (value: string) => {
    setSelectedSeatType(value);
  };

  const handleEventClick = (value: string) => {
    alert(value);
  };

  const showSeatKind = () => {
    if (selectedSeatType === '개인석') {
      return (
        <>
          <div className={styles.seatKindContainer}>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>다른좌석유형/이용불가</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>내예약</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능</div>
            </div>
          </div>
          <SeatLayout onSeatClick={handleEventClick} />
        </>
      );
    } else if (selectedSeatType === '팀플석') {
      return (
        <>
          <div className={styles.seatKindContainer}>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>다른좌석유형/이용불가</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>내예약</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능 (4인석)</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능 (2인석)</div>
            </div>
          </div>
          <SeatLayout onSeatClick={handleEventClick} />
        </>
      );
    } else if (selectedSeatType === '수료기수석') {
      return (
        <>
          <div className={styles.seatKindContainer}>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>다른좌석유형/이용불가</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>내예약</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능 (개인석)</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능 (2인석)</div>
            </div>
          </div>
          <SeatLayout onSeatClick={handleEventClick} />
        </>
      );
    } else if (selectedSeatType === '미팅룸') {
      return (
        <>
          <CreateTypeSelector
            typeList={[
              { value: '미팅룸 A (최대 6인)' },
              { value: '미팅룸 B (최대 10인)' },
            ]}
            onSelect={(value: string) => {
              alert(value);
            }}
          />
          <div className={styles.visitor}>모든 방문자 성함을 작성해주세요.</div>
          <input type='text' placeholder='필수입력*' />
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <CreateTypeSelector
        typeList={seatTypeList}
        onSelect={handleSeatTypeSelect}
      />
      <CreateTypeSelector typeList={TimeList} onSelect={() => {}} />
      {showSeatKind()}
    </div>
  );
};

export default ReservationOptions;
