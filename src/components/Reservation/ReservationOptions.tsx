import React, { useState } from 'react';
import styles from './ReservationOptions.module.scss';
import {
  PersonalSeatLayout,
  FirstGroupSeatLayout,
  GraduateSeatLayout,
  SecondGroupSeatLayout,
} from 'components/Reservation/SeatLayout';
interface typeInfo {
  value: string;
}

interface CreateTypeSelectorProps {
  typeList: typeInfo[];
  onSelect: (value: string) => void;
}

// 가짜 데이터
const fakeUserData = {
  name: '김철수',
  reservation: [
    {
      reservation_date: '2023.05.29',
      start_time: '10:00',
      seat_number: '개인석-2',
      status: '예약완료',
    },
    {
      reservation_date: '2023.05.29',
      start_time: '14:00',
      seat_number: '개인석-2',
      status: '예약완료',
    },
  ],
};
const fakeSeatData = {
  seat_number: ['개인석-1', '개인석-3', '개인석-4', '개인석-5', '개인석-6'],
  available: true,
  reservation_date: '2023.05.29',
  start_time: '10:00',
};

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

  const [selectedTime, setSelectedTime] = useState(TimeList[0].value);

  const handleSeatTypeSelect = (value: string) => {
    setSelectedSeatType(value);
  };

  const handleTimeSelect = (value: string) => {
    setSelectedTime(value);
    alert(value);
    if (value === '10:00~14:00') {
      fakeSeatData.start_time = '10:00';
    }
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
          <div className={styles.seatContainer}>
            <PersonalSeatLayout
              className={`${styles.possible}`}
              clickEvent={handleEventClick}
            />
            <FirstGroupSeatLayout
              className={`${styles.impossible}`}
              clickEvent={handleEventClick}
            />
            <GraduateSeatLayout
              className={`${styles.impossible}`}
              clickEvent={handleEventClick}
            />
            <SecondGroupSeatLayout
              className={`${styles.impossible}`}
              clickEvent={handleEventClick}
            />
          </div>
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
          <div className={styles.seatContainer}>
            <PersonalSeatLayout
              className={styles.impossible}
              clickEvent={handleEventClick}
            />
            <FirstGroupSeatLayout
              className={styles.possible}
              clickEvent={handleEventClick}
            />
            <GraduateSeatLayout
              className={styles.impossible}
              clickEvent={handleEventClick}
            />
            <SecondGroupSeatLayout
              className={styles.possible}
              clickEvent={handleEventClick}
            />
          </div>
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
          <div className={styles.seatContainer}>
            <PersonalSeatLayout
              className={styles.impossible}
              clickEvent={handleEventClick}
            />
            <FirstGroupSeatLayout
              className={styles.impossible}
              clickEvent={handleEventClick}
            />
            <GraduateSeatLayout
              className={styles.possible}
              clickEvent={handleEventClick}
            />
            <SecondGroupSeatLayout
              className={styles.impossible}
              clickEvent={handleEventClick}
            />
          </div>
        </>
      );
    } else if (selectedSeatType === '미팅룸') {
      return (
        <div>
          <CreateTypeSelector
            typeList={[
              { value: '미팅룸 A (최대 6인)' },
              { value: '미팅룸 B (최대 10인)' },
            ]}
            onSelect={(value: string) => {
              console.log(value);
            }}
          />
          <div className={styles.visitor}>모든 방문자 성함을 작성해주세요.</div>
          <input
            className={styles.visitorInput}
            type='text'
            placeholder='필수입력*'
          />
        </div>
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
      <CreateTypeSelector typeList={TimeList} onSelect={handleTimeSelect} />
      {showSeatKind()}
    </div>
  );
};

export default ReservationOptions;
