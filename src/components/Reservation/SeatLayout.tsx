import { useContext, useEffect, useState } from 'react';
import { ReservationContext, ReservationInfo } from './ReservationProvider';
import { CreateTypeSelector } from './ReservationOptions';
import styles from './ReservationOptions.module.scss';

import ConfirmModal from '../common/ConfirmModal';
import { useAppDispatch } from '../../hooks/useRedux';
import { openConfirmModal, closeConfirmModal } from '../../reducers/modal';

import SubmitModal from './SubmitModal';
import findAvailableSeats, {
  ServerResponse,
  getAvailableSeatsByTimes,
} from './FindAvailableSeats';
import seatDatas from './seatDatas.json';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface SeatLayoutProps {
  className?: string;
  clickEvent?: (value: string) => void;
}

// axios.get('api', {
//   headers: {
//     date: reservationInfo.date,
//   },
// })
//   .then(response => {
//
//   })
//   .catch(error => {
//     // 에러 처리
//   });
// 날짜 서버에 보내서 예약된 좌석 받아오기
// const { reserved, updateReserved } = useContext(ReservationContext);
// updateReserved(예약된 좌석 정보);

const ShowSeatLayout: React.FC = () => {
  const { reservationInfo, updateReservationInfo } =
    useContext(ReservationContext);

  const [canReservationSeat, setCanReservationSeat] = useState<string[]>([]);
  const [checkReservation, setCheckReservation] = useState<string>('');
  const [clickedSubmit, setClickedSubmit] = useState<boolean>(false);
  const serverData: ServerResponse[] = seatDatas;
  const availableSeats = findAvailableSeats(serverData[0]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCheckReservation(
      `${reservationInfo.seatType} ${reservationInfo.seat}번 좌석을 예약하시겠습니까?`,
    );

    setCanReservationSeat(
      getAvailableSeatsByTimes(availableSeats, reservationInfo.startTime),
    );

    console.log(canReservationSeat);

    console.log('reservationInfo의 정보가 바뀔 때마다 새로 데이터 저장');
    console.log(reservationInfo);
  }, [
    reservationInfo.date,
    reservationInfo.seatType,
    reservationInfo.startTime,
    reservationInfo.seat,
  ]);

  const updateReservation = (updatedInfo: Partial<ReservationInfo>) => {
    const updatedReservationInfo = {
      ...reservationInfo,
      ...updatedInfo,
    };
    updateReservationInfo(updatedReservationInfo);
  };

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
      const isPossibleSeat = canReservationSeat.includes(key);
      const className = isPossibleSeat
        ? styles.visible
        : `${styles.visible} ${styles.alreadyReserved}`;
      const event = isPossibleSeat
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
      const isPossibleSeat = canReservationSeat.includes(key);
      const className = isPossibleSeat
        ? `${styles.visible} ${styles.groupSeat}`
        : `${styles.visible} ${styles.groupSeat} ${styles.alreadyReserved}`;
      const event = isPossibleSeat
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
      const isPossibleSeat = canReservationSeat.includes(key);
      const className = isPossibleSeat
        ? `${styles.visible} ${styles.groupSeat}`
        : `${styles.visible} ${styles.groupSeat} ${styles.alreadyReserved}`;
      const event = isPossibleSeat
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
      const isPossibleSeat = canReservationSeat.includes(key);
      const className = isPossibleSeat
        ? `${styles.visible} ${styles.graduateSeat}`
        : `${styles.visible} ${styles.graduateSeat} ${styles.alreadyReserved}`;
      const event = isPossibleSeat
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

  function PersonalSeatLayout({ className, clickEvent }: SeatLayoutProps) {
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

  function FirstGroupSeatLayout({ className, clickEvent }: SeatLayoutProps) {
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

  function GraduateSeatLayout({ className, clickEvent }: SeatLayoutProps) {
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

  function SecondGroupSeatLayout({ className, clickEvent }: SeatLayoutProps) {
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

  function ClickPersonalSeat({ clickEvent }: SeatLayoutProps) {
    return (
      <>
        <div className={styles.seatKindContainer}>
          <div>
            <div className={styles.box}></div>
            <div className={styles.kindText}>다른좌석유형/이용불가</div>
          </div>
          <div>
            <div className={styles.box}></div>
            <div className={styles.kindText}>이용가능</div>
          </div>
        </div>
        <div className={styles.seatContainer}>
          <PersonalSeatLayout
            className={styles.possible}
            clickEvent={clickEvent}
          />
          <FirstGroupSeatLayout className={styles.impossible} />
          <GraduateSeatLayout className={styles.impossible} />
          <SecondGroupSeatLayout className={styles.impossible} />
        </div>
      </>
    );
  }

  function ClickGroupSeat({ clickEvent }: SeatLayoutProps) {
    return (
      <>
        <div className={styles.seatKindContainer}>
          <div>
            <div className={styles.box}></div>
            <div className={styles.kindText}>다른좌석유형/이용불가</div>
          </div>
          <div>
            <div className={styles.box}></div>
            <div className={styles.kindText}>이용가능 (4인석)</div>
          </div>
          <div>
            <div className={styles.box}></div>
            <div className={styles.kindText}>이용가능 (2인석)</div>
          </div>
        </div>
        <div className={styles.seatContainer}>
          <PersonalSeatLayout className={styles.impossible} />
          <FirstGroupSeatLayout
            className={styles.possible}
            clickEvent={clickEvent}
          />
          <GraduateSeatLayout className={styles.impossible} />
          <SecondGroupSeatLayout
            className={styles.possible}
            clickEvent={clickEvent}
          />
        </div>
      </>
    );
  }

  function ClickGraduateSeat({ clickEvent }: SeatLayoutProps) {
    return (
      <>
        <div className={styles.seatKindContainer}>
          <div>
            <div className={styles.box}></div>
            <div className={styles.kindText}>다른좌석유형/이용불가</div>
          </div>
          <div>
            <div className={styles.box}></div>
            <div className={styles.kindText}>이용가능 (개인석)</div>
          </div>
          <div>
            <div className={styles.box}></div>
            <div className={styles.kindText}>이용가능 (2인석)</div>
          </div>
        </div>
        <div className={styles.seatContainer}>
          <PersonalSeatLayout className={styles.impossible} />
          <FirstGroupSeatLayout className={styles.impossible} />
          <GraduateSeatLayout
            className={styles.possible}
            clickEvent={clickEvent}
          />
          <SecondGroupSeatLayout className={styles.impossible} />
        </div>
      </>
    );
  }

  function ClickMeetingRoom() {
    let typeList: string[] = [];
    if (canReservationSeat.includes('A')) {
      typeList = ['미팅룸B (최대 10인)'];
    } else if (canReservationSeat.includes('B')) {
      typeList = ['미팅룸A (최대 6인)'];
    } else {
      typeList = ['미팅룸A (최대 6인)', '미팅룸B (최대 10인)'];
    }
    return (
      <div>
        <CreateTypeSelector
          typeList={typeList}
          onSelect={(value: string) => {
            updateReservation({ seat: value.charAt(3) });
          }}
        />
        <div className={styles.visitor}>모든 방문자 성함을 작성해주세요.</div>
        <input
          className={styles.visitorInput}
          onChange={e => {
            updateReservation({ visitors: e.target.value });
          }}
          type='text'
          placeholder='필수입력*'
        />
        <div
          className={styles.submitButton}
          onClick={() => setClickedSubmit(true)}
        >
          예약하기
        </div>
      </div>
    );
  }

  const handleClickEvent = (value: string) => {
    updateReservation({ seat: value });
    dispatch(openConfirmModal());
  };

  const handleModalClick = () => {
    setClickedSubmit(false);
  };

  const ShowSeatLayout = () => {
    if (reservationInfo.seatType === '개인석') {
      return <ClickPersonalSeat clickEvent={handleClickEvent} />;
    } else if (reservationInfo.seatType === '팀플석') {
      return <ClickGroupSeat clickEvent={handleClickEvent} />;
    } else if (reservationInfo.seatType === '수료기수석') {
      return <ClickGraduateSeat clickEvent={handleClickEvent} />;
    } else if (reservationInfo.seatType === '미팅룸') {
      return <ClickMeetingRoom />;
      // (
      //   <div>
      //     <CreateTypeSelector
      //       typeList={['미팅룸A (최대 6인)', '미팅룸B (최대 10인)']}
      //       onSelect={(value: string) => {
      //         updateReservation({ seat: value.charAt(3) });
      //       }}
      //     />
      //     <div className={styles.visitor}>모든 방문자 성함을 작성해주세요.</div>
      //     <input
      //       className={styles.visitorInput}
      //       onChange={e => {
      //         updateReservation({ visitors: e.target.value });
      //       }}
      //       type='text'
      //       placeholder='필수입력*'
      //     />
      //     <div
      //       className={styles.submitButton}
      //       onClick={() => setClickedSubmit(true)}
      //     >
      //       예약하기
      //     </div>
      //   </div>
      // );
    } else {
      return null;
    }
  };

  return (
    <>
      {ShowSeatLayout()}
      <ConfirmModal
        modalMessage={checkReservation}
        modalController={() => {
          dispatch(closeConfirmModal());
          setClickedSubmit(true);
        }}
      />
      {clickedSubmit ? <SubmitModal onClick={handleModalClick} /> : null}
    </>
  );
};

export default ShowSeatLayout;
