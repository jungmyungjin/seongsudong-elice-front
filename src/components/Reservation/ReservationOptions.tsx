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

      dispatch(updateReservationInfo(updatedReservationInfo));
    };

    useEffect(() => {}, [reservationInfo.reservation_date]);

    const [selectedCheckbox, setSelectedCheckbox] = useState(
      reservationInfo.reservation_date.slice(-2),
    );

    // const getCurrentWeekDates = () => {
    //   const today = new Date();
    //   const day = today.getDay();
    //   const startDate = new Date(today);
    //   startDate.setDate(startDate.getDate() - day + 1);

    //   const weekdayDates = [];

    //   for (let i = 0; i < 5; i++) {
    //     const date = startDate.getDate().toString().padStart(2, '0');
    //     weekdayDates.push(date);

    //     startDate.setDate(startDate.getDate() + 1);
    //   }

    //   return weekdayDates;
    // };

    const getCurrentWeekDates = () => {
      const today = new Date();
      const day = today.getDay();
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() - day + 1);

      if (day === 0 || day === 6) {
        startDate.setDate(startDate.getDate() + 7); // 토요일이나 일요일인 경우 다음 주의 시작 날짜로 설정
      }

      const weekdayDates = [];

      for (let i = 0; i < 5; i++) {
        const date = startDate.getDate().toString().padStart(2, '0');
        weekdayDates.push(date);

        startDate.setDate(startDate.getDate() + 1);
      }

      return weekdayDates;
    };

    // const getCurrentWeekDates = () => {
    //   const today = new Date();
    //   const day = today.getDay();
    //   const hour = today.getHours();
    //   const startDate = new Date(today);

    //   if (day === 5 && hour >= 18) {
    //     startDate.setDate(startDate.getDate() + 3 + 7); // 금요일 오후 6시 이후라면 다음주의 시작 날짜로 설정 (현재 날짜 + 3일 + 7일)
    //   } else if (day === 0 || day === 6) {
    //     startDate.setDate(startDate.getDate() + 7); // 토요일이나 일요일인 경우 다음 주의 시작 날짜로 설정
    //   } else {
    //     startDate.setDate(startDate.getDate() - day + 1);
    //   }

    //   const weekdayDates = [];

    //   for (let i = 0; i < 5; i++) {
    //     const date = startDate.getDate().toString().padStart(2, '0');
    //     weekdayDates.push(date);

    //     startDate.setDate(startDate.getDate() + 1);
    //   }

    //   return weekdayDates;
    // };

    // const handleSelectedDateChange = (
    //   e: React.ChangeEvent<HTMLInputElement>,
    // ) => {
    //   setSelectedCheckbox(e.target.id);
    //   const weekDates = getCurrentWeekDates();
    //   const index = getCurrentWeekdayDates().indexOf(e.target.id);

    //   updateReservation({
    //     reservation_date: weekDates[index].replace(/\./g, '-').slice(0, -3),
    //   });
    // };

    const handleSelectedDateChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const selectedDate = e.target.id;
      const weekDates = getCurrentWeekDates();
      const index = getCurrentWeekDates().indexOf(selectedDate);

      // 오늘 날짜와 선택한 날짜를 비교하여 이전 날짜인 경우에만 alert 메시지를 띄웁니다.
      const today = new Date();
      const selectedDateObject = new Date(weekDates[index]);
      if (selectedDateObject < today) {
        alert('지난 날짜에는 예약이 불가합니다.');
        return;
      }

      setSelectedCheckbox(selectedDate);
      updateReservation({
        reservation_date: weekDates[index].replace(/\./g, '-').slice(0, -3),
      });
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

// const TimeSelector: React.FC<MultiSelectorProps> = ({ typeList }) => {
//   const [isClicked, setIsClicked] = useState<boolean[]>(
//     typeList.map((_, index) => index === 0),
//   );

//   const reservationInfo = useSelector((state: RootState) => state.reservation);
//   const dispatch = useDispatch();

//   const updateReservation = (
//     updatedInfo: Partial<ReservationState> & { date?: string },
//   ) => {
//     const updatedReservationInfo = {
//       ...reservationInfo,
//       ...updatedInfo,
//     };
//     dispatch(updateReservationInfo(updatedReservationInfo));
//   };

//   useEffect(() => {
//     // 최소 한 개의 항목이 선택되도록 처리
//     const clickedCount = isClicked.filter(Boolean).length;
//     if (clickedCount === 0) {
//       const updatedClickedState = [...isClicked];
//       updatedClickedState[0] = true;
//       setIsClicked(updatedClickedState);
//     }
//     const selectedTimes = typeList.filter((_, index) => isClicked[index]);
//     const time = selectedTimes.join(', ');
//     updateReservation({ time: time });
//     // console.log(reservationInfo.time);
//   }, [isClicked]);

//   // const handleClick = (index: number, type: string) => {
//   //   // 클릭 상태 변경
//   //   const updatedClickedState = [...isClicked];
//   //   updatedClickedState[index] = !updatedClickedState[index];
//   //   setIsClicked(updatedClickedState);
//   // };

//   const handleClick = (index: number, type: string) => {
//     const currentTime = new Date().getHours(); // 현재 시간 가져오기
//     const [startHour] = type.split(':');
//     const startTime = Number(startHour);

//     // 선택한 시간과 현재 시간 비교
//     if (startTime < currentTime) {
//       // 선택한 시간이 현재 시간을 지났을 경우 클릭 이벤트 실행하지 않음
//       alert('지난 시간을 예약하실 수 없습니다.');
//       return;
//     }

//     // 클릭 상태 변경
//     const updatedClickedState = [...isClicked];
//     updatedClickedState[index] = !updatedClickedState[index];
//     setIsClicked(updatedClickedState);
//   };

//   return (
//     <div className={styles.TimeSelector}>
//       {typeList.map((type, index) => (
//         <button
//           key={type}
//           className={
//             isClicked[index] ? styles.checkedType : styles.unCheckedType
//           }
//           onClick={() => handleClick(index, type)}
//         >
//           {type}
//         </button>
//       ))}
//     </div>
//   );
// };

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
