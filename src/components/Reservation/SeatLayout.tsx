import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useRedux';

import { RootState } from '../../store/configureStore';
import { ReservationState, SeatLayoutProps } from '../../types/reservation';
import { updateReservationInfo } from '../../reducers/reservation';

import { SingleSelect } from './ReservationOptions';

import ConfirmModal from '../common/ConfirmModal';
import { openConfirmModal, closeConfirmModal } from '../../reducers/modal';

import SubmitModal from './SubmitModal';
import AlertModal from './AlertModal';

import { findAvailableSeats, ServerResponse } from './FindAvailableSeats';
// 더미 데이터
// import serverDatas from './seatDatas.json';

import axios from 'axios';

import styles from './seatLayout.module.scss';

const SeatLayout: React.FC = () => {
  const reservationInfo = useSelector((state: RootState) => state.reservation);
  const dispatch = useAppDispatch();

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
  const [isReservationFail, setIsReservationFail] = useState<boolean>(false);

  // 더미데이터
  // const [serverData, setServerData] = useState<ServerResponse>(serverDatas);

  // 서버 통신
  const [serverData, setServerData] = useState<ServerResponse>({});

  useEffect(() => {
    // 더미데이터
    // setServerData(serverDatas);

    // 서버 통신
    // fetchServerData(reservationInfo.time);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `${process.env.REACT_APP_BACKEND_ADDRESS}/reservations/seat-check?reservation_date=${reservationInfo.reservation_date}`,
          `http://localhost:8080/api/reservations/seat-check?reservation_date=${reservationInfo.reservation_date}`,
        );
        const serverDatas = response.data;
        setServerData(serverDatas);
        const seats = findAvailableSeats(serverDatas, '10:00~14:00');
        setCanReservationSeat(seats);
        console.log(serverDatas);
      } catch (error) {
        // 에러 처리
        console.error(error);
      }
    };

    fetchData();
    // console.log(canReservationSeat);
  }, [reservationInfo.reservation_date]);

  useEffect(() => {
    // console.log(reservationInfo.time);
    const seats = findAvailableSeats(serverData, reservationInfo.time);
    setCanReservationSeat(seats);
    // console.log(canReservationSeat);
  }, [reservationInfo.time]);

  useEffect(() => {
    setCheckReservation(
      `${reservationInfo.seat_type} ${reservationInfo.seat_number}번 좌석을 예약하시겠습니까?`,
    );
  }, [reservationInfo.seat_number]);

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
    const [isReservationFail, setIsReservationFail] = useState(false);
    const [isVisiterNameInput, setIsVisiterNameInput] = useState(false);
    let typeList: string[] = [];
    if (canReservationSeat.includes('A') && canReservationSeat.includes('B')) {
      typeList = ['미팅룸A (최대 6인)', '미팅룸B (최대 10인)'];
    } else if (canReservationSeat.includes('A')) {
      typeList = ['미팅룸A (최대 6인)'];
    } else if (canReservationSeat.includes('B')) {
      typeList = ['미팅룸B (최대 10인)'];
    }

    const [inputValue, setInputValue] = useState('');

    const handleClickSubmit = () => {
      if (typeList.length === 0) {
        setIsReservationFail(true);
        return;
      }
      if (inputValue === '') {
        setIsVisiterNameInput(true);
        return;
      }

      updateReservation({ visitors: inputValue });
    };

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
        <div className={styles.submitButton} onClick={handleClickSubmit}>
          예약하기
        </div>
        {isReservationFail && (
          <AlertModal
            modalMessage1='예약 가능한 미팅룸이 없습니다.🥹'
            onClick={() => setIsReservationFail(false)}
          />
        )}
        {isVisiterNameInput && (
          <AlertModal
            modalMessage1='모든 방문자 성함을 작성해주세요.😉'
            onClick={() => setIsVisiterNameInput(false)}
          />
        )}
      </div>
    );
  }

  const handleClickSeatNumber = (value: string) => {
    updateReservation({ seat_number: value });
    dispatch(openConfirmModal());
  };

  const handleModalController = async () => {
    // 리듀서에 저장된 유저 정보
    // const { email, username, generation } = useSelector(
    //   (state: RootState) => state.user,
    // );

    const timeArray = reservationInfo.time
      .split(', ')
      .map(time => time.split('~'));
    const startTime = timeArray.map(time => time[0].trim());
    const endTime = timeArray.map(time => time[1].trim());

    try {
      for (let i = 0; i < timeArray.length; i++) {
        const request = {
          member_generation: 'SW/2',
          member_name: '갤럭시',
          member_email: 'email222@gmail.com',
          // 리듀서에 저장된 유저 정보
          // member_generation: generation,
          // member_name: username,
          // member_email: email,
          reservation_date: reservationInfo.reservation_date,
          start_time: startTime[i],
          end_time: endTime[i],
          visitors: '',
          seat_type: reservationInfo.seat_type,
          seat_number: reservationInfo.seat_number,
        };

        const response = await axios.post(
          // `${process.env.REACT_APP_BACKEND_ADDRESS}/reservations`,
          `http://localhost:8080/api/reservations`,
          request,
        );

        setClickedSubmit(true);
        console.log(request); // 요청(request) 정보 출력
        console.log(response.data);
      }
    } catch (error) {
      setIsReservationFail(true);
      console.error(error);
    }

    dispatch(closeConfirmModal());
  };

  const ShowSeatLayout = () => {
    if (reservationInfo.seat_type === '개인석') {
      return <ClickPersonalSeat clickEvent={handleClickSeatNumber} />;
    } else if (reservationInfo.seat_type === '팀플석') {
      return <ClickGroupSeat clickEvent={handleClickSeatNumber} />;
    } else if (reservationInfo.seat_type === '수료기수석') {
      return <ClickGraduateSeat clickEvent={handleClickSeatNumber} />;
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
        modalController={handleModalController}
      />
      {clickedSubmit && <SubmitModal onClick={() => setClickedSubmit(false)} />}
      {isReservationFail && (
        <AlertModal
          modalMessage1='좌석 예약에 실패하였습니다.🥹'
          modalMessage2='새로고침 후 다시 시도해주세요.'
          onClick={() => setIsReservationFail(false)}
        />
      )}
    </>
  );
};

export default SeatLayout;
