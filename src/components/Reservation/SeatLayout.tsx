import { useContext } from 'react';
import { ReservationContext } from './ReservationProvider';
import styles from './ReservationOptions.module.scss';

interface SeatLayoutProps {
  className: string;
  clickEvent?: (value: string) => void;
}
// 더미데이터
const alreadyReservedSeat = [
  '2',
  '3',
  '4',
  '7',
  '8',
  '10',
  '23',
  '31',
  '32',
  '33',
  '34',
  '35',
  '39',
  '47',
  '55',
  '56',
  '57',
  '59',
  '61',
  '63',
  '66',
  '67',
  '69',
  '70',
  '71',
  '72',
  '77',
  '78',
  '79',
];
// const { reserved, updateReserved } = useContext(ReservationContext);

function drawPersonalSeatLayout(
  startSeatNumber: number,
  reserved: string[],
  onClick?: (value: string) => void,
): JSX.Element[] {
  const seatingCapacity: number = 12;
  const visibleSeats: number[] = [1, 3, 5, 8, 10, 12];
  const seats: JSX.Element[] = [];
  let keyValue = startSeatNumber;

  for (let i = 1; i <= seatingCapacity; i++) {
    const key = keyValue.toString();
    const isImpossibleSeat = alreadyReservedSeat.includes(key);
    // const isImpossibleSeat = !reserved.includes(key);
    const className = isImpossibleSeat
      ? `${styles.visible} ${styles.alreadyReserved}`
      : styles.visible;
    const event = !isImpossibleSeat
      ? (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          onClick?.(event.currentTarget.textContent || '')
      : undefined;

    if (visibleSeats.includes(i)) {
      seats.push(
        <div key={key} className={className} onClick={event}>
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
  reserved: string[],
  onClick?: (value: string) => void,
): JSX.Element[] {
  const seats: JSX.Element[] = [];
  let keyValue = startSeatNumber;

  for (let i = 1; i <= 4; i++) {
    const key = keyValue.toString();
    const isImpossibleSeat = alreadyReservedSeat.includes(key);
    // const isImpossibleSeat = !reserved.includes(key);
    const className = isImpossibleSeat
      ? `${styles.visible} ${styles.groupSeat} ${styles.alreadyReserved}`
      : `${styles.visible} ${styles.groupSeat}`;
    const event = !isImpossibleSeat
      ? (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          onClick?.(event.currentTarget.textContent || '')
      : undefined;

    seats.push(
      <div key={key} className={className} onClick={event}>
        {key}
      </div>,
    );
    keyValue++;
  }

  for (let i = 5; i <= 6; i++) {
    const key = keyValue.toString();
    const isImpossibleSeat = alreadyReservedSeat.includes(key);
    // const isImpossibleSeat = !reserved.includes(key);
    const className = isImpossibleSeat
      ? `${styles.visible} ${styles.groupSeat} ${styles.alreadyReserved}`
      : `${styles.visible} ${styles.groupSeat}`;
    const event = !isImpossibleSeat
      ? (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          onClick?.(event.currentTarget.textContent || '')
      : undefined;

    seats.push(
      <div key={key} className={className} onClick={event}>
        {key}
      </div>,
    );
    keyValue++;
  }

  return seats;
}

function drawGraduateSeatLayout(
  startSeatNumber: number,
  reserved: string[],
  onClick?: (value: string) => void,
): JSX.Element[] {
  const seatingCapacity: number = 12;
  const visibleSeats: number[] = [2, 4, 7, 9, 12];
  const seats: JSX.Element[] = [];
  let keyValue = startSeatNumber;

  for (let i = 1; i <= seatingCapacity; i++) {
    const key = keyValue.toString();
    const isImpossibleSeat = alreadyReservedSeat.includes(key);
    // const isImpossibleSeat = !reserved.includes(key);
    const className = isImpossibleSeat
      ? `${styles.visible} ${styles.graduateSeat} ${styles.alreadyReserved}`
      : `${styles.visible} ${styles.graduateSeat}`;
    const event = !isImpossibleSeat
      ? (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          onClick?.(event.currentTarget.textContent || '')
      : undefined;

    if (visibleSeats.includes(i)) {
      seats.push(
        <div key={key} className={className} onClick={event}>
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

export function PersonalSeatLayout({ className, clickEvent }: SeatLayoutProps) {
  const { reserved } = useContext(ReservationContext);
  return (
    <>
      <div className={className}>
        {drawPersonalSeatLayout(1, reserved, clickEvent)}
      </div>
      <div className={className}>
        {drawPersonalSeatLayout(7, reserved, clickEvent)}
      </div>
      <div className={className}>
        {drawPersonalSeatLayout(13, reserved, clickEvent)}
      </div>
      <div className={className}>
        {drawPersonalSeatLayout(19, reserved, clickEvent)}
      </div>
      <div className={className}>
        {drawPersonalSeatLayout(25, reserved, clickEvent)}
      </div>
    </>
  );
}

export function FirstGroupSeatLayout({
  className,
  clickEvent,
}: SeatLayoutProps) {
  const { reserved } = useContext(ReservationContext);
  return (
    <>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(31, reserved, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(37, reserved, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(43, reserved, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(49, reserved, clickEvent)}
      </div>
    </>
  );
}

export function GraduateSeatLayout({ className, clickEvent }: SeatLayoutProps) {
  const { reserved } = useContext(ReservationContext);

  return (
    <>
      <div className={`${styles.graduateSeat} ${className}`}>
        {drawGraduateSeatLayout(55, reserved, clickEvent)}
      </div>
      <div className={`${styles.graduateSeat} ${className}`}>
        {drawGraduateSeatLayout(60, reserved, clickEvent)}
      </div>
    </>
  );
}

export function SecondGroupSeatLayout({
  className,
  clickEvent,
}: SeatLayoutProps) {
  const { reserved } = useContext(ReservationContext);
  return (
    <>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(65, reserved, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(71, reserved, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(77, reserved, clickEvent)}
      </div>
    </>
  );
}
