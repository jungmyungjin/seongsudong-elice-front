import React, { useState, useContext } from 'react';
import RenderReservation from './ReservationOptions';
import styles from './ReservationOptions.module.scss';
import { ReactComponent as Check } from '../../assets/Check.svg';
import {
  ReservationProvider,
  ReservationContext,
  ReservationInfo,
} from './ReservationProvider';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Reservation: React.FC = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    // const month = String(today.getMonth() + 1).padStart(2, '0');
    return `${year}`;
  };

  const getWeekDates = () => {
    const today = new Date();
    const day = today.getDay();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - day);
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dayOfWeek = ['월', '화', '수', '목', '금'][date.getDay()];
      dates.push(`${getCurrentDate()}.${month}.${day}(${dayOfWeek})`);
    }
    return dates;
  };

  const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    const handleCheckboxChange = () => {
      onChange(!checked);
    };

    return (
      <>
        <input
          type='checkbox'
          id={label}
          checked={checked}
          onChange={handleCheckboxChange}
          className={styles.checkboxInput}
        />
        <label htmlFor={label} className={styles.checkboxLabel}>
          {checked && <Check />}
        </label>
      </>
    );
  };

  const DateDisplay: React.FC = () => {
    const currentDate = getCurrentDate();
    const weekDates = getWeekDates();

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

  const CheckboxContainer: React.FC = () => {
    const [selectedCheckbox, setSelectedCheckbox] = useState('월');

    const { reservationInfo, updateReservationInfo } =
      useContext(ReservationContext);

    const handleCheckboxChange = (day: string) => {
      setSelectedCheckbox(day);
      const weekDates = getWeekDates();
      const index = ['월', '화', '수', '목', '금'].indexOf(day);

      updateReservation({
        date: weekDates[index].split('(')[0].replace(/\./g, '-'),
      });
    };

    const updateReservation = (updatedInfo: Partial<ReservationInfo>) => {
      const updatedReservationInfo = {
        ...reservationInfo,
        ...updatedInfo,
      };
      updateReservationInfo(updatedReservationInfo);
    };

    return (
      <div className={styles.checkbox}>
        {['월', '화', '수', '목', '금'].reverse().map((day, index) => (
          <Checkbox
            key={day}
            label={`cb${index + 1}`}
            checked={selectedCheckbox === day}
            onChange={() => handleCheckboxChange(day)}
          />
        ))}
      </div>
    );
  };

  return (
    <ReservationProvider>
      <div className={styles.container}>
        <div className={styles.title}>좌석 예약</div>
        <DateDisplay />
        <CheckboxContainer />
        <RenderReservation />
      </div>
    </ReservationProvider>
  );
};

export default Reservation;
