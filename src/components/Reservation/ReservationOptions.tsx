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
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 일요일(0)부터 토요일(6)까지의 숫자를 반환합니다.

    // 금요일 오후 6시 이후, 토요일, 일요일인 경우 다음주 날짜를 리턴합니다.
    if (
      currentDay >= 5 ||
      (currentDay === 4 && currentDate.getHours() >= 18) ||
      (currentDay === 3 &&
        currentDate.getHours() === 18 &&
        currentDate.getMinutes() >= 0)
    ) {
      const nextWeekDates = [];

      const nextWeekStartDate = new Date(currentDate);
      nextWeekStartDate.setDate(currentDate.getDate() + (7 - currentDay) + 1);

      for (let i = 0; i < 5; i++) {
        const date = new Date(nextWeekStartDate);
        date.setDate(nextWeekStartDate.getDate() + i);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const dayOfWeek = ['일', '월', '화', '수', '목', '금'][date.getDay()];
        nextWeekDates.push(`${getCurrentYear()}.${month}.${day}(${dayOfWeek})`);
      }

      return nextWeekDates;
    }

    // 그 외의 경우 이번주 날짜를 리턴합니다.
    const thisWeekDates = [];

    const thisWeekStartDate = new Date(currentDate);
    thisWeekStartDate.setDate(currentDate.getDate() - currentDay);

    for (let i = 0; i < 5; i++) {
      const date = new Date(thisWeekStartDate);
      date.setDate(thisWeekStartDate.getDate() + i);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dayOfWeek = ['월', '화', '수', '목', '금'][date.getDay()];
      thisWeekDates.push(`${getCurrentYear()}.${month}.${day}(${dayOfWeek})`);
    }

    return thisWeekDates;
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

      dispatch(updateReservationInfo(updatedReservationInfo));
    };

    useEffect(() => {}, [reservationInfo.reservation_date]);

    const [selectedCheckbox, setSelectedCheckbox] = useState(
      reservationInfo.reservation_date.slice(-2),
    );

    const getCurrentWeekDates = () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); // 일요일(0)부터 토요일(6)까지의 숫자를 반환합니다.

      // 금요일 오후 6시 이후, 토요일, 일요일인 경우 다음주 날짜를 리턴합니다.
      if (
        currentDay >= 5 ||
        (currentDay === 4 && currentDate.getHours() >= 18) ||
        (currentDay === 3 &&
          currentDate.getHours() === 18 &&
          currentDate.getMinutes() >= 0)
      ) {
        const nextWeekDates = [];

        const nextWeekStartDate = new Date(currentDate);
        nextWeekStartDate.setDate(currentDate.getDate() + (7 - currentDay) + 1);

        for (let i = 0; i < 5; i++) {
          const date = new Date(nextWeekStartDate);
          date.setDate(nextWeekStartDate.getDate() + i);
          const dateStr = date.getDate().toString().padStart(2, '0');
          nextWeekDates.push(dateStr);
        }

        return nextWeekDates;
      }

      // 그 외의 경우 이번주 날짜를 리턴합니다.
      const thisWeekDates = [];

      for (let i = 0; i < 5; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        const dateStr = date.getDate().toString().padStart(2, '0');
        thisWeekDates.push(dateStr);
      }

      return thisWeekDates;
    };

    const handleSelectedDateChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const selectedDate = e.target.id;
      const weekDates = getCurrentWeekDates();
      const index = getCurrentWeekDates().indexOf(selectedDate);

      // 오늘 날짜와 선택한 날짜를 비교하여 이전 날짜인 경우에만 alert 메시지를 띄웁니다.
      const date = new Date().getDate().toString().padStart(2, '0');
      if (weekDates[index] < date) {
        alert('지난 날짜에는 예약이 불가합니다.');
        return;
      }
      console.log(weekDates[index]);

      setSelectedCheckbox(weekDates[index]);
      updateReservation({
        reservation_date: '23-06-12',
      });
      console.log(reservationInfo.reservation_date);
    };

    return (
      <div className={styles.checkbox}>
        {getCurrentWeekDates().map(day => (
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
  name,
  onSelect,
}) => {
  const [selectedType, setSelectedType] = useState<string>(typeList[0]);

  const handleSelect = (type: string) => {
    if (onSelect) {
      onSelect(type);
    }
    setSelectedType(type);
  };

  return (
    <div className={styles.typeSelector}>
      {typeList.map(type => (
        <label
          key={type}
          className={
            selectedType === type ? styles.checkedType : styles.unCheckedType
          }
        >
          <input
            type='radio'
            name={name}
            value={type}
            checked={selectedType === type}
            onChange={() => handleSelect(type)}
            className={styles.checkboxInput}
          />
          {type}
        </label>
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
    // 최소 한 개의 항목이 선택되도록 처리
    const clickedCount = isClicked.filter(Boolean).length;
    if (clickedCount === 0) {
      const updatedClickedState = [...isClicked];
      updatedClickedState[0] = true;
      setIsClicked(updatedClickedState);
    }
    const selectedTimes = typeList.filter((_, index) => isClicked[index]);
    const time = selectedTimes.join(', ');
    updateReservation({ time: time });
  }, [isClicked]);

  useEffect(() => {
    // 초기 렌더링 시 reservationInfo.time과 동일한 항목을 선택한 상태로 설정
    const initialSelectedIndex = typeList.findIndex(
      time => time === reservationInfo.time,
    );
    if (initialSelectedIndex !== -1) {
      const updatedClickedState = typeList.map(
        (_, index) => index === initialSelectedIndex,
      );
      setIsClicked(updatedClickedState);
    }
  }, []); // 빈 배열로 전달하여 최초 한 번만 실행되도록 설정

  const handleClick = (index: number, type: string) => {
    const currentTime = new Date().getHours(); // 현재 시간 가져오기
    const [startHour] = type.split(':');
    const startTime = Number(startHour);

    // 선택한 시간과 현재 시간 비교
    if (startTime < currentTime) {
      // 선택한 시간이 현재 시간을 지났을 경우 클릭 이벤트 실행하지 않음
      alert('지난 시간을 예약하실 수 없습니다.');
      return;
    }

    // 클릭 상태 변경
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
          onClick={() => handleClick(index, type)}
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

  const handleMeetingRoomTimeSelect = (value: string) => {
    updateReservation({ time: value });
  };

  return (
    <>
      <DateOptions />
      <SingleSelect
        typeList={seatTypeList}
        name='seatType'
        onSelect={handleSeatTypeSelect}
      />
      {!isMeetingRoom ? (
        <TimeSelector typeList={TimeList} />
      ) : (
        <div className={styles.meetingRoomTimeSelector}>
          <SingleSelect
            typeList={TimeList}
            name='time'
            onSelect={handleMeetingRoomTimeSelect}
          />
        </div>
      )}
    </>
  );
};

export default ReservationOptions;
