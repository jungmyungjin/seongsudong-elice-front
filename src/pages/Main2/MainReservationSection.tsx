import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './mainReservationSection.module.scss';
import darkStyles from './mainReservationSectionDark.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

interface MainReservationSectionProps {
  route: string;
}

const MainReservationSection = (props: MainReservationSectionProps) => {
  const { route } = props;
  const handleClick = (path: string) => {
    navigate(path);
  };
  let navigate = useNavigate();

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(
    () => (isDarkMode ? darkStyles : styles),
    [isDarkMode],
  );

  return (
    <div className={styles.MainReservationSection}>
      <button
        className={selectedStyles.ReservationButton}
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
