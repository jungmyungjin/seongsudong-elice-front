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
import {
  getCurrentYear,
  getWeekdayDates,
  isSameDay,
  getNearestAvailableTime,
  isPassedTime,
} from '../../utils/getDate';
import AlertModal from './AlertModal';

import { ReactComponent as Check } from '../../assets/Check.svg';
import styles from './reservationOptions.module.scss';

const DateOptions: React.FC = () => {
  const SelectDate: React.FC<SelectDateProps> = ({
    label,
    changeHandler,
    selectedCheckbox,
  }) => (
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

  const DateDisplay: React.FC = () => {
    const currentDate = getCurrentYear();
    const weekDates = getWeekdayDates();

    return (
      <section className={styles.dateContainer}>
        <time className={styles.currentDate}>{currentDate}</time>
        <div className={styles.date}>
          {weekDates.map((date, index) => (
            <time key={index}>{date.slice(5).replace(/-/g, '.')}</time>
          ))}
        </div>
      </section>
    );
  };

  const SelectDateContainer: React.FC = () => {
    const [isPastDate, setIsPastDate] = useState(false);

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

    const [selectedCheckbox, setSelectedCheckbox] = useState(
      reservationInfo.reservation_date,
    );

    const handleSelectedDateChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const selectedDate = e.target.id;
      // console.log(selectedDate);
      const weekDates = getWeekdayDates();
      const notIncludeDay = weekDates.map(date => date.split('(')[0]);
      const index = notIncludeDay.indexOf(selectedDate);

      // 오늘 날짜와 선택한 날짜를 비교하여 이전 날짜인 경우에만 alert 메시지를 띄웁니다.
      const currentDate = new Date();
      const clickedDate = new Date(weekDates[index]);
      currentDate.setHours(0, 0, 0, 0);
      clickedDate.setHours(0, 0, 0, 0);

      if (clickedDate < currentDate) {
        setIsPastDate(true);
        return;
      }

      setSelectedCheckbox(weekDates[index]);
      updateReservation({
        reservation_date: notIncludeDay[index],
      });
    };

    return (
      <div className={styles.checkbox}>
        {getWeekdayDates().map(day => (
          <SelectDate
            key={day.slice(0, -3)}
            label={day.slice(0, -3)}
            selectedCheckbox={selectedCheckbox}
            changeHandler={handleSelectedDateChange}
          />
        ))}
        {isPastDate && (
          <AlertModal
            modalMessage1='지난 날짜에는 예약이 불가합니다.🥹'
            onClick={() => setIsPastDate(false)}
          />
        )}
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
  const [isPastTime, setIsPastTime] = useState(false);

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
      const getTimeIndex = (): number => {
        const currentHour = new Date().getHours();

        if (currentHour >= 14 && currentHour < 18) {
          return 1;
        } else if (currentHour >= 18 && currentHour < 22) {
          return 2;
        } else {
          return 0;
        }
      };
      const updatedClickedState = [...isClicked];
      updatedClickedState[getTimeIndex()] = true;
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
  }, []);

  useEffect(() => {
    if (isSameDay(reservationInfo.reservation_date)) {
      const initialSelectedIndex = typeList.findIndex(
        time => time === getNearestAvailableTime(),
      );
      if (initialSelectedIndex !== -1) {
        const updatedClickedState = typeList.map(
          (_, index) => index === initialSelectedIndex,
        );
        setIsClicked(updatedClickedState);
      }
      updateReservation({ time: getNearestAvailableTime() });
    }
  }, [reservationInfo.reservation_date]);

  const handleTimeClick = (index: number, time: string) => {
    const timeParts = time.split('~');
    const [endHour] = timeParts[1].split(':');
    const endTime = Number(endHour);

    const updatedClickedState = [...isClicked];
    updatedClickedState[index] = !updatedClickedState[index];

    function checkIsPassedTime() {
      setIsPastTime(true);
      updatedClickedState[index] = !updatedClickedState[index];
      setIsClicked(updatedClickedState);
    }
    isPassedTime(endTime, reservationInfo.reservation_date, checkIsPassedTime);

    if (!isPastTime) {
      setIsClicked(updatedClickedState);
    }
  };

  return (
    <div className={styles.TimeSelector}>
      {typeList.map((type, index) => (
        <button
          key={type}
          className={
            isClicked[index] ? styles.checkedType : styles.unCheckedType
          }
          onClick={() => handleTimeClick(index, type)}
        >
          {type}
        </button>
      ))}
      {isPastTime && (
        <AlertModal
          modalMessage1='지난 시간을 예약하실 수 없습니다.🥹'
          onClick={() => setIsPastTime(false)}
        />
      )}
    </div>
  );
};

const ReservationOptions: React.FC = () => {
  const seatTypeList: string[] = ['개인석', '팀플석', '수료기수석', '미팅룸'];
  const TimeList = ['10:00~14:00', '14:00~18:00', '18:00~22:00'];
  const [isMeetingRoom, setIsMeetingRoom] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>(
    getNearestAvailableTime(),
  );
  const [isPastTime, setIsPastTime] = useState<boolean>(false);

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
      updateReservation({ seat_type: value, time: getNearestAvailableTime() });
      setIsMeetingRoom(true);
    } else {
      updateReservation({ seat_type: value });
      setIsMeetingRoom(false);
    }
  };

  const handleMeetingRoomTimeSelect = (time: string) => {
    const timeParts = time.split('~');
    const [endHour] = timeParts[1].split(':');
    const endTime = Number(endHour);

    setSelectedType(time);
    updateReservation({ time: time });

    function checkIsPassedTime() {
      updateReservation({ time: getNearestAvailableTime() });
      setSelectedType(getNearestAvailableTime());
      setIsPastTime(true);
    }

    isPassedTime(endTime, reservationInfo.reservation_date, checkIsPassedTime);
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
          <div className={styles.typeSelector}>
            {TimeList.map(time => (
              <label
                key={time}
                className={
                  selectedType === time
                    ? styles.checkedType
                    : styles.unCheckedType
                }
              >
                <input
                  type='radio'
                  name='meetingRoomTimeList'
                  value={time}
                  checked={selectedType === time}
                  onClick={() => handleMeetingRoomTimeSelect(time)}
                  className={styles.checkboxInput}
                />
                {time}
              </label>
            ))}
          </div>
        </div>
      )}
      {isPastTime && (
        <AlertModal
          modalMessage1='지난 시간을 예약하실 수 없습니다.🥹'
          onClick={() => setIsPastTime(false)}
        />
      )}
    </>
  );
};

export default ReservationOptions;
