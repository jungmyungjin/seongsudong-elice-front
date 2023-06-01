import styles from './ReservationOptions.module.scss';

interface SeatLayoutProps {
  className: string;
  clickEvent?: (value: string) => void;
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
          className={styles.visible}
          onClick={event => onClick?.(event.currentTarget.textContent || '')}
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
        onClick={event => onClick?.(event.currentTarget.textContent || '')}
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
        onClick={event => onClick?.(event.currentTarget.textContent || '')}
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
          onClick={event => onClick?.(event.currentTarget.textContent || '')}
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

export function PersonalSeatLayout({ className, clickEvent }: SeatLayoutProps) {
  return (
    <>
      <div className={className}>{drawPersonalSeatLayout(1, clickEvent)}</div>
      <div className={className}>{drawPersonalSeatLayout(7, clickEvent)}</div>
      <div className={className}>{drawPersonalSeatLayout(13, clickEvent)}</div>
      <div className={className}>{drawPersonalSeatLayout(19, clickEvent)}</div>
      <div className={className}>{drawPersonalSeatLayout(25, clickEvent)}</div>
    </>
  );
}

export function FirstGroupSeatLayout({
  className,
  clickEvent,
}: SeatLayoutProps) {
  return (
    <>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(31, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(37, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(43, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(49, clickEvent)}
      </div>
    </>
  );
}

export function GraduateSeatLayout({ className, clickEvent }: SeatLayoutProps) {
  return (
    <>
      <div className={className}>{drawGraduateSeatLayout(55, clickEvent)}</div>
      <div className={className}>{drawGraduateSeatLayout(59, clickEvent)}</div>
    </>
  );
}

export function SecondGroupSeatLayout({
  className,
  clickEvent,
}: SeatLayoutProps) {
  return (
    <>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(63, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(69, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(75, clickEvent)}
      </div>
    </>
  );
}
