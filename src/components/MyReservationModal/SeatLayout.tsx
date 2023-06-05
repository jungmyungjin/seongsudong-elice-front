import styles from './SeatLayout.module.scss';

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
        {' '}
        {drawGroupSeatLayout(33, myReservation)}
      </div>
      <div className={styles.group}>
        {' '}
        {drawGroupSeatLayout(35, myReservation)}
      </div>
      <div className={styles.group}>
        {' '}
        {drawGroupSeatLayout(37, myReservation)}
      </div>
    </>
  );
}

function GraduateSeatLayout({ myReservation }: { myReservation: string }) {
  return (
    <>
      <div className={styles.graduateSeat}>
        {drawGraduateSeatLayout(39, myReservation)}
      </div>
      <div className={styles.graduateSeat}>
        {drawGraduateSeatLayout(44, myReservation)}
      </div>
    </>
  );
}

function SecondGroupSeatLayout({ myReservation }: { myReservation: string }) {
  return (
    <>
      <div className={styles.group}>
        {' '}
        {drawGroupSeatLayout(49, myReservation)}
      </div>
      <div className={styles.group}>
        {' '}
        {drawGroupSeatLayout(51, myReservation)}
      </div>
      <div className={styles.group}>
        {' '}
        {drawGroupSeatLayout(53, myReservation)}
      </div>
    </>
  );
}

export const ProgrammingZone: React.FC<{
  myReservation: string;
}> = ({ myReservation }) => {
  console.log('myReservation', typeof myReservation);
  const ProgrammingZone = () => {
    return (
      <div className={styles.seatLayoutContainer}>
        <div className={styles.seatContainer}>
          <PersonalSeatLayout myReservation={myReservation} />
          <FirstGroupSeatLayout myReservation={myReservation} />
          <GraduateSeatLayout myReservation={myReservation} />
          <SecondGroupSeatLayout myReservation={myReservation} />
          <div className={styles.entrance}>출입문</div>
          <div className={styles.managerZone}>ManagerZone</div>
        </div>
      </div>
    );
  };

  return <>{ProgrammingZone()}</>;
};

export const MeetingRoom: React.FC<{
  myReservation: string;
}> = ({ myReservation }) => {
  return (
    <div className={styles.meetingRoomContainer}>
      <div className={myReservation === 'A' ? styles.myReservation : ''}>
        미팅룸 A
      </div>
      <div className={myReservation === 'B' ? styles.myReservation : ''}>
        미팅룸 B
      </div>
      <div>라운지</div>
      <div>출입문</div>
    </div>
  );
};
