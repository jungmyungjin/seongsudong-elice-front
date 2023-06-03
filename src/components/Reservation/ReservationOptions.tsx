import React, { useContext, useEffect, useState } from 'react';
import { ReservationContext, ReservationInfo } from './ReservationProvider';
import styles from './ReservationOptions.module.scss';
import ShowSeatLayout from 'components/Reservation/SeatLayout';

interface CreateTypeSelectorProps {
  typeList: string[];
  onSelect: (value: string) => void;
}

interface CreateTimeSelectorProps {
  typeList: string[];
}

export const CreateTypeSelector: React.FC<CreateTypeSelectorProps> = ({
  typeList,
  onSelect,
}) => {
  const [selectedSeatTypeIndex, setSelectedSeatTypeIndex] = useState<number>(0);

  return (
    <div className={styles.typeContainer}>
      {typeList.map((type, index) => (
        <button
          key={type}
          className={
            selectedSeatTypeIndex === index
              ? styles.checkedType
              : styles.unCheckedType
          }
          onClick={() => {
            onSelect(type);
            setSelectedSeatTypeIndex(index);
          }}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

const CreateTimeSelector: React.FC<CreateTimeSelectorProps> = ({
  typeList,
}) => {
  const [isClicked, setIsClicked] = useState<boolean[]>(
    typeList.map((_, index) => index === 0),
  );

  const { reservationInfo, updateReservationInfo } =
    useContext(ReservationContext);
  const updateReservation = (updatedInfo: Partial<ReservationInfo>) => {
    const updatedReservationInfo = {
      ...reservationInfo,
      ...updatedInfo,
    };
    updateReservationInfo(updatedReservationInfo);
  };

  useEffect(() => {
    const selectedTimes = typeList.filter((_, index) => isClicked[index]);
    const startTime = selectedTimes
      .map(time => time.substring(0, 2))
      .join(', ');

    updateReservation({ startTime: startTime });
  }, [isClicked]);

  const handleClick = (index: number) => {
    const updatedClickedState = [...isClicked];
    updatedClickedState[index] = !updatedClickedState[index];
    setIsClicked(updatedClickedState);
  };

  return (
    <div className={styles.typeContainer}>
      {typeList.map((type, index) => (
        <button
          key={type}
          className={
            isClicked[index] ? styles.checkedType : styles.unCheckedType
          }
          onClick={() => handleClick(index)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

const ReservationOptions: React.FC = () => {
  const seatTypeList: string[] = ['개인석', '팀플석', '수료기수석', '미팅룸'];
  const TimeList = ['10:00~14:00', '14:00~18:00', '18:00~22:00'];

  const { reservationInfo, updateReservationInfo } =
    useContext(ReservationContext);

  const updateReservation = (updatedInfo: Partial<ReservationInfo>) => {
    const updatedReservationInfo = {
      ...reservationInfo,
      ...updatedInfo,
    };
    updateReservationInfo(updatedReservationInfo);
  };

  useEffect(() => {
    console.log('다른 파일 좌석 컴포넌트 렌더링');
    console.log(reservationInfo);
  }, [
    reservationInfo.seatType,
    reservationInfo.startTime,
    reservationInfo.seat,
    updateReservationInfo,
  ]);

  const handleSeatTypeSelect = (value: string) => {
    updateReservation({ seatType: value });
    if (value === '미팅룸') {
      updateReservation({ seatType: value, seat: 'A' });
    }
  };

  return (
    <div>
      <CreateTypeSelector
        typeList={seatTypeList}
        onSelect={handleSeatTypeSelect}
      />
      <CreateTimeSelector typeList={TimeList} />
      <ShowSeatLayout />
    </div>
  );
};

export default ReservationOptions;
