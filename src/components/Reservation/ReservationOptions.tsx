import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import {
  ReservationState,
  SelectDateProps,
  SingleSelectProps,
  MultiSelectorProps,
} from '../../types/reservation';
import { updateReservationInfo } from '../../reducers/reservation';

import { ReactComponent as Check } from '../../assets/Check.svg';

import styles from './reservationOptions.module.scss';

const DateOptions: React.FC = () => {
  const getCurrentYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}`;
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const day = today.getDay();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - day);
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = (date.getDate() + 1).toString().padStart(2, '0');
      const dayOfWeek = ['월', '화', '수', '목', '금'][date.getDay()];
      dates.push(`${getCurrentYear()}.${month}.${day}(${dayOfWeek})`);
    }
    return dates;
  };

  const SelectDate: React.FC<SelectDateProps> = ({
    label,
    changeHandler,
    selectedCheckbox,
  }) => {
    return (
      <>
        <input
          type='radio'
          name='dateSelector'
          id={label}
          onChange={changeHandler}
          className={styles.checkboxInput}
          checked={selectedCheckbox === label}
        />
        <label htmlFor={label} className={styles.checkboxLabel}>
          {selectedCheckbox === label && <Check />}
        </label>
      </>
    );
  };

  const DateDisplay: React.FC = () => {
    const currentDate = getCurrentYear();
    const weekDates = getCurrentWeekDates();

    return (
      <div className={styles.dateContainer}>
        <div className={styles.currentDate}>{currentDate}</div>
        <div className={styles.date}>
          {weekDates.map((date, index) => (
            <div key={index}>{date.slice(5)}</div>
          ))}
        </div>
      </div>
    );
  };

  const SelectDateContainer: React.FC = () => {
    const reservationInfo = useSelector(
      (state: RootState) => state.reservation,
    );
    const dispatch = useDispatch();
    const updateReservation = (updatedInfo: Partial<ReservationState>) => {
      const updatedReservationInfo = {
        ...reservationInfo,
        ...updatedInfo,
      };

      console.log(updatedReservationInfo);
      dispatch(updateReservationInfo(updatedReservationInfo));
    };

    useEffect(() => {
      console.log('날짜 바뀜');
    }, [reservationInfo.reservation_date]);

    const [selectedCheckbox, setSelectedCheckbox] = useState(
      reservationInfo.reservation_date.slice(-2),
    );

    const getCurrentWeekdayDates = () => {
      const today = new Date();
      const day = today.getDay();
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() - day + 1);

      const weekdayDates = [];

      for (let i = 0; i < 5; i++) {
        const date = startDate.getDate().toString().padStart(2, '0');
        weekdayDates.push(date);

        startDate.setDate(startDate.getDate() + 1);
      }

      return weekdayDates;
    };

    const handleSelectedDateChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setSelectedCheckbox(e.target.id);
      const weekDates = getCurrentWeekDates();
      const index = getCurrentWeekdayDates().indexOf(e.target.id);

      updateReservation({
        reservation_date: weekDates[index].replace(/\./g, '-').slice(0, -3),
      });
    };

    return (
      <div className={styles.checkbox}>
        {getCurrentWeekdayDates().map(day => (
          <SelectDate
            key={day}
            label={day}
            selectedCheckbox={selectedCheckbox}
            changeHandler={handleSelectedDateChange}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <DateDisplay />
      <SelectDateContainer />
    </>
  );
};

export const SingleSelect: React.FC<SingleSelectProps> = ({
  typeList,
  onSelect,
}) => {
  const [selectedSeatTypeIndex, setSelectedSeatTypeIndex] = useState<number>(0);

  const handleSelect = (type: string, index: number) => {
    if (onSelect) {
      onSelect(type);
    }
    setSelectedSeatTypeIndex(index);
  };

  return (
    <div className={styles.typeSelector}>
      {typeList.map((type, index) => (
        <button
          key={type}
          className={
            selectedSeatTypeIndex === index
              ? styles.checkedType
              : styles.unCheckedType
          }
          onClick={() => handleSelect(type, index)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

const TimeSelector: React.FC<MultiSelectorProps> = ({ typeList }) => {
  const [isClicked, setIsClicked] = useState<boolean[]>(
    typeList.map((_, index) => index === 0),
  );

  const reservationInfo = useSelector((state: RootState) => state.reservation);
  const dispatch = useDispatch();

  const updateReservation = (
    updatedInfo: Partial<ReservationState> & { date?: string },
  ) => {
    const updatedReservationInfo = {
      ...reservationInfo,
      ...updatedInfo,
    };
    dispatch(updateReservationInfo(updatedReservationInfo));
  };

  useEffect(() => {
    const selectedTimes = typeList.filter((_, index) => isClicked[index]);
    const time = selectedTimes.join(', ');
    updateReservation({ time: time });
  }, [isClicked]);

  const handleClick = (index: number) => {
    const updatedClickedState = [...isClicked];
    updatedClickedState[index] = !updatedClickedState[index];
    setIsClicked(updatedClickedState);
  };

  return (
    <div className={styles.TimeSelector}>
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
  const [isMeetingRoom, setIsMeetingRoom] = useState<boolean>(false);

  const reservationInfo = useSelector((state: RootState) => state.reservation);
  const dispatch = useDispatch();

  const updateReservation = (updatedInfo: Partial<ReservationState>) => {
    const updatedReservationInfo = {
      ...reservationInfo,
      ...updatedInfo,
    };
    dispatch(updateReservationInfo(updatedReservationInfo));
  };

  const handleSeatTypeSelect = (value: string) => {
    if (value === '미팅룸') {
      updateReservation({ seat_type: value, seat_number: 'A' });
      setIsMeetingRoom(true);
    } else {
      setIsMeetingRoom(false);
      updateReservation({ seat_type: value });
    }
  };

  return (
    <>
      <DateOptions />
      <SingleSelect typeList={seatTypeList} onSelect={handleSeatTypeSelect} />
      {!isMeetingRoom ? (
        <TimeSelector typeList={TimeList} />
      ) : (
        <div className={styles.meetingRoomTimeSelector}>
          <SingleSelect typeList={TimeList} />
        </div>
      )}
    </>
  );
};

export default ReservationOptions;
