import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './mainReservationSection.module.scss';

interface MainReservationSectionProps {
  route: string;
}

const MainReservationSection = (props: MainReservationSectionProps) => {
  const { route } = props;
  const handleClick = (path: string) => {
    navigate(path);
  };
  let navigate = useNavigate();
  return (
    <div className={styles.MainReservationSection}>
      <button
        className={styles.ReservationButton}
        onClick={() => handleClick(route)}
      >
        <div className={styles.title}>
          <span>앨리스랩 </span>
          <span>예약</span>
        </div>
      </button>
    </div>
  );
};

export default MainReservationSection;
