import { useSelector } from 'react-redux';
import styles from './SeatLayout.module.scss';
import darkStyles from './SeatLayoutDark.module.scss';
import { RootState } from 'store/configureStore';
import { useMemo } from 'react';

function drawPersonalSeatLayout(
  startSeatNumber: number,
  myReservation: string,
): JSX.Element[] {
  const seatingCapacity: number = 12;
  const visibleSeats: number[] = [1, 3, 5, 8, 10, 12];
  const seats: JSX.Element[] = [];
  let keyValue = startSeatNumber;

  for (let i = 1; i <= seatingCapacity; i++) {
    const key = keyValue.toString();
    const isMyReservationSeat = myReservation === key;
    const classValue = isMyReservationSeat ? `${styles.myReservation}` : '';

    if (visibleSeats.includes(i)) {
      seats.push(
        <div key={key} className={classValue}>
          {key}
        </div>,
      );
      keyValue++;
    } else {
      seats.push(<div key={i + 200} className={styles.invisible}></div>);
    }
  }

  return seats;
}

function drawGroupSeatLayout(
  startSeatNumber: number,
  myReservation: string,
): JSX.Element[] {
  const seats: JSX.Element[] = [];
  let keyValue = startSeatNumber || 0;

  for (let i = 1; i <= 2; i++) {
    const key = keyValue.toString();
    const isMyReservationSeat = myReservation === key;
    const classValue = isMyReservationSeat ? `${styles.myReservation}` : '';

    seats.push(
      <div key={key} className={classValue}>
        {key}
      </div>,
    );
    keyValue++;
  }

  return seats;
}

function drawGraduateSeatLayout(
  startSeatNumber: number,
  myReservation: string,
): JSX.Element[] {
  const seatingCapacity: number = 12;
  const visibleSeats: number[] = [2, 4, 7, 9, 12];
  const seats: JSX.Element[] = [];
  let keyValue = startSeatNumber || 0;

  for (let i = 1; i <= seatingCapacity; i++) {
    const key = keyValue.toString();
    const isMyReservationSeat = myReservation === key;
    const classValue = isMyReservationSeat ? `${styles.myReservation}` : '';

    if (visibleSeats.includes(i)) {
      seats.push(
        <div key={key} className={classValue}>
          {key}
        </div>,
      );
      keyValue++;
    } else {
      seats.push(<div key={i + 200} className={styles.invisible}></div>);
    }
  }

  return seats;
}

function PersonalSeatLayout({ myReservation }: { myReservation: string }) {
  return (
    <>
      <div>{drawPersonalSeatLayout(1, myReservation)}</div>
      <div>{drawPersonalSeatLayout(7, myReservation)}</div>
      <div>{drawPersonalSeatLayout(13, myReservation)}</div>
      <div>{drawPersonalSeatLayout(19, myReservation)}</div>
      <div>{drawPersonalSeatLayout(25, myReservation)}</div>
    </>
  );
}

function FirstGroupSeatLayout({ myReservation }: { myReservation: string }) {
  return (
    <>
      <div className={styles.group}>
        {drawGroupSeatLayout(31, myReservation)}
      </div>
      <div className={styles.group}>
        {drawGroupSeatLayout(33, myReservation)}
      </div>
      <div className={styles.group}>
        {drawGroupSeatLayout(35, myReservation)}
      </div>
      <div className={styles.group}>
        {drawGroupSeatLayout(37, myReservation)}
      </div>
    </>
  );
}

function GraduateSeatLayout({ myReservation }: { myReservation: string }) {
  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);
  return (
    <>
      <div className={selectedStyles.graduateSeat}>
        {drawGraduateSeatLayout(39, myReservation)}
      </div>
      <div className={selectedStyles.graduateSeat}>
        {drawGraduateSeatLayout(44, myReservation)}
      </div>
    </>
  );
}

function SecondGroupSeatLayout({ myReservation }: { myReservation: string }) {
  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);
  return (
    <>
      <div className={styles.group}>
        {drawGroupSeatLayout(49, myReservation)}
      </div>
      <div className={styles.group}>
        {drawGroupSeatLayout(51, myReservation)}
      </div>
      <div className={styles.group}>
        {drawGroupSeatLayout(53, myReservation)}
      </div>
    </>
  );
}

export const ProgrammingZone: React.FC<{
  myReservation: string;
}> = ({ myReservation }) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  const ProgrammingZone = () => {
    return (
      <div className={selectedStyles.seatLayoutContainer}>
        <div className={selectedStyles.seatContainer}>
          <PersonalSeatLayout myReservation={myReservation} />
          <FirstGroupSeatLayout myReservation={myReservation} />
          <GraduateSeatLayout myReservation={myReservation} />
          <SecondGroupSeatLayout myReservation={myReservation} />
          <div className={selectedStyles.entrance}>출입문</div>
          <div className={selectedStyles.managerZone}>ManagerZone</div>
        </div>
      </div>
    );
  };

  return <>{ProgrammingZone()}</>;
};

export const MeetingRoom: React.FC<{
  myReservation: string;
}> = ({ myReservation }) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <div className={selectedStyles.meetingRoomContainer}>
      <div
        className={myReservation === 'A' ? selectedStyles.myReservation : ''}
      >
        미팅룸 A
      </div>
      <div
        className={myReservation === 'B' ? selectedStyles.myReservation : ''}
      >
        미팅룸 B
      </div>
      <div>라운지</div>
      <div>출입문</div>
    </div>
  );
};
