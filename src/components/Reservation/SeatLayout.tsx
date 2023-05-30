import styles from './SeatLayout.module.scss';

interface SeatLayoutProps {
  onSeatClick?: (value: string) => void;
}

function drawPersonalSeatLayout(
  startSeatNumber: number,
  onClick?: (value: string) => void,
): React.ReactNode {
  const seatingCapacity: number = 12;
  const visibleSeats: number[] = [1, 3, 5, 8, 10, 12];
  const seats: JSX.Element[] = [];
  let keyValue = startSeatNumber;
  for (let i = 1; i <= seatingCapacity; i++) {
    if (visibleSeats.includes(i)) {
      seats.push(
        <div
          key={keyValue}
          className={`${styles.visible} ${styles.personalSeat}`}
          onClick={event =>
            onClick?.(`개인석-${event.currentTarget.textContent}` || '')
          }
        >
          {keyValue}
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
  onClick?: (value: string) => void,
): React.ReactNode {
  const seats: JSX.Element[] = [];
  let keyValue = startSeatNumber;
  for (let i = 1; i <= 4; i++) {
    seats.push(
      <div
        key={keyValue}
        className={`${styles.visible} ${styles.groupSeat}`}
        onClick={event =>
          onClick?.(`팀플석-${event.currentTarget.textContent}` || '')
        }
      >
        {keyValue}
      </div>,
    );
    keyValue++;
  }
  for (let i = 5; i <= 6; i++) {
    seats.push(
      <div
        key={keyValue}
        className={`${styles.visible} ${styles.groupSeat}`}
        onClick={event =>
          onClick?.(`팀플석-${event.currentTarget.textContent}` || '')
        }
      >
        {keyValue}
      </div>,
    );
    keyValue++;
  }
  return seats;
}

function drawGraduateSeatLayout(
  startSeatNumber: number,
  onClick?: (value: string) => void,
): React.ReactNode {
  const seatingCapacity: number = 12;
  const visibleSeats: number[] = [2, 4, 7, 9, 12];
  const seats: JSX.Element[] = [];
  let keyValue = startSeatNumber;
  for (let i = 1; i <= seatingCapacity; i++) {
    if (visibleSeats.includes(i)) {
      seats.push(
        <div
          key={keyValue}
          className={`${styles.visible} ${styles.graduateSeat}`}
          onClick={event =>
            onClick?.(`수료기수석-${event.currentTarget.textContent}` || '')
          }
        >
          {keyValue}
        </div>,
      );
      keyValue++;
    } else {
      seats.push(<div key={i + 200} className={styles.invisible}></div>);
    }
  }
  return seats;
}

export default function SeatLayout({ onSeatClick }: SeatLayoutProps) {
  return (
    <div className={styles.container}>
      <div>{drawPersonalSeatLayout(1, onSeatClick)}</div>
      <div>{drawPersonalSeatLayout(7, onSeatClick)}</div>
      <div>{drawPersonalSeatLayout(13, onSeatClick)}</div>
      <div>{drawPersonalSeatLayout(19, onSeatClick)}</div>
      <div>{drawPersonalSeatLayout(25, onSeatClick)}</div>
      <div className={styles.group}>{drawGroupSeatLayout(31, onSeatClick)}</div>
      <div className={styles.group}>{drawGroupSeatLayout(37, onSeatClick)}</div>
      <div className={styles.group}>{drawGroupSeatLayout(43, onSeatClick)}</div>
      <div className={styles.group}>{drawGroupSeatLayout(49, onSeatClick)}</div>
      <div>{drawGraduateSeatLayout(55, onSeatClick)}</div>
      <div>{drawGraduateSeatLayout(59, onSeatClick)}</div>
      <div className={styles.group}>{drawGroupSeatLayout(63, onSeatClick)}</div>
      <div className={styles.group}>{drawGroupSeatLayout(69, onSeatClick)}</div>
      <div className={styles.group}>{drawGroupSeatLayout(75, onSeatClick)}</div>
    </div>
  );
}
