import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useRedux';
import { RootState } from '../../store/configureStore';

import { ReservationState, SeatLayoutProps } from '../../types/reservation';
import { updateReservationInfo } from '../../reducers/reservation';

import ConfirmModal from '../common/ConfirmModal';
import { openConfirmModal, closeConfirmModal } from '../../reducers/modal';

import { SingleSelect } from './ReservationOptions';
import SubmitModal from './SubmitModal';

import { findAvailableSeats, ServerResponse } from './FindAvailableSeats';
// 더미 데이터
import serverDatas from './seatDatas.json';

import styles from './seatLayout.module.scss';

const SeatLayout: React.FC = () => {
  const reservationInfo = useSelector((state: RootState) => state.reservation);

  /* 예약정보 업데이트할 떄 사용하는 함수 */
  const updateReservation = (updatedInfo: Partial<ReservationState>) => {
    const updatedReservationInfo = {
      ...reservationInfo,
      ...updatedInfo,
    };
    dispatch(updateReservationInfo(updatedReservationInfo));
  };

  const [canReservationSeat, setCanReservationSeat] = useState<string[]>([]);
  const [checkReservation, setCheckReservation] = useState<string>('');
  const [clickedSubmit, setClickedSubmit] = useState<boolean>(false);
  let serverData: ServerResponse = {};

  const dispatch = useAppDispatch();
  useEffect(() => {
    setCheckReservation(
      `${reservationInfo.seat_type} ${reservationInfo.seat_number}번 좌석을 예약하시겠습니까?`,
    );
  }, [reservationInfo.seat_number]);

  useEffect(() => {
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
    serverData = serverDatas;

    console.log('날짜 정보 바뀜');
  }, [reservationInfo.reservation_date]);

  useEffect(() => {
    console.log(canReservationSeat);
    const seats = findAvailableSeats(serverData, reservationInfo.time);
    setCanReservationSeat(seats);
  }, [reservationInfo.time]);

  function personalSeatLayout(
    startSeatNumber: number,
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

  function groupSeatLayout(
    startSeatNumber: number,
    onClick?: (value: string) => void,
  ): JSX.Element[] {
    const seats: JSX.Element[] = [];
    let keyValue = startSeatNumber || 0;

    for (let i = 1; i <= 2; i++) {
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

  function graduateSeatLayout(
    startSeatNumber: number,
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
    return (
      <>
        <div className={className}>{personalSeatLayout(1, clickEvent)}</div>
        <div className={className}>{personalSeatLayout(7, clickEvent)}</div>
        <div className={className}>{personalSeatLayout(13, clickEvent)}</div>
        <div className={className}>{personalSeatLayout(19, clickEvent)}</div>
        <div className={className}>{personalSeatLayout(25, clickEvent)}</div>
      </>
    );
  }

  function FirstGroupSeatLayout({ className, clickEvent }: SeatLayoutProps) {
    return (
      <>
        <div className={`${styles.group} ${className}`}>
          {groupSeatLayout(31, clickEvent)}
        </div>
        <div className={`${styles.group} ${className}`}>
          {groupSeatLayout(33, clickEvent)}
        </div>
        <div className={`${styles.group} ${className}`}>
          {groupSeatLayout(35, clickEvent)}
        </div>
        <div className={`${styles.group} ${className}`}>
          {groupSeatLayout(37, clickEvent)}
        </div>
      </>
    );
  }

  function GraduateSeatLayout({ className, clickEvent }: SeatLayoutProps) {
    return (
      <>
        <div className={`${styles.graduateSeat} ${className}`}>
          {graduateSeatLayout(39, clickEvent)}
        </div>
        <div className={`${styles.graduateSeat} ${className}`}>
          {graduateSeatLayout(44, clickEvent)}
        </div>
      </>
    );
  }

  function SecondGroupSeatLayout({ className, clickEvent }: SeatLayoutProps) {
    return (
      <>
        <div className={`${styles.group} ${className}`}>
          {groupSeatLayout(49, clickEvent)}
        </div>
        <div className={`${styles.group} ${className}`}>
          {groupSeatLayout(51, clickEvent)}
        </div>
        <div className={`${styles.group} ${className}`}>
          {groupSeatLayout(53, clickEvent)}
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
          <div className={styles.entrance}>출입문</div>
        </div>
        <div className={styles.managerZone}>ManagerZone</div>
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
          <div className={styles.entrance}>출입문</div>
        </div>
        <div className={styles.managerZone}>ManagerZone</div>
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
          <div className={styles.entrance}>출입문</div>
        </div>
      </>
    );
  }

  function ClickMeetingRoom() {
    let typeList: string[] = [];
    if (canReservationSeat.includes('A')) {
      typeList = ['미팅룸A (최대 6인)'];
    } else if (canReservationSeat.includes('A')) {
      typeList = ['미팅룸B (최대 10인)'];
    } else if (
      canReservationSeat.includes('A') &&
      canReservationSeat.includes('B')
    ) {
      typeList = ['미팅룸A (최대 6인)', '미팅룸B (최대 10인)'];
    }
    const [inputValue, setInputValue] = useState('');

    return (
      <div>
        <SingleSelect
          typeList={typeList}
          onSelect={(value: string) => {
            updateReservation({ seat_number: value.charAt(3) });
          }}
        />
        <div className={styles.visitor}>모든 방문자 성함을 작성해주세요.</div>
        <input
          className={styles.visitorInput}
          onChange={e => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
          type='text'
          placeholder='필수입력*'
        />
        <div
          className={styles.submitButton}
          onClick={() => {
            dispatch(openConfirmModal());
            updateReservation({ visitors: inputValue });
          }}
        >
          예약하기
        </div>
      </div>
    );
  }

  const handleClickSeatType = (value: string) => {
    updateReservation({ seat_number: value });
    dispatch(openConfirmModal());
  };

  const handleSubmitCLick = () => {
    setClickedSubmit(false);
  };

  const ShowSeatLayout = () => {
    if (reservationInfo.seat_type === '개인석') {
      return <ClickPersonalSeat clickEvent={handleClickSeatType} />;
    } else if (reservationInfo.seat_type === '팀플석') {
      return <ClickGroupSeat clickEvent={handleClickSeatType} />;
    } else if (reservationInfo.seat_type === '수료기수석') {
      return <ClickGraduateSeat clickEvent={handleClickSeatType} />;
    } else if (reservationInfo.seat_type === '미팅룸') {
      return <ClickMeetingRoom />;
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
      {clickedSubmit ? <SubmitModal onClick={handleSubmitCLick} /> : null}
    </>
  );
};

export default SeatLayout;
