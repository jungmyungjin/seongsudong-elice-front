import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useRedux';

import { RootState } from '../../store/configureStore';
import { ReservationState, SeatLayoutProps } from '../../types/reservation';
import { updateReservationInfo } from '../../reducers/reservation';

import { SingleSelector } from './ReservationOptions';

import ConfirmModal from '../common/ConfirmModal';
import { openConfirmModal, closeConfirmModal } from '../../reducers/modal';

import SubmitModal from './SubmitModal';
import AlertModal from './AlertModal';

import {
  findAvailableSeats,
  ServerResponse,
} from '../../utils/FindAvailableSeats';

import axios, { AxiosRequestConfig } from 'axios';

import styles from './seatLayout.module.scss';
import darkStyles from './seatLayoutDark.module.scss';

interface ResponseDataType {
  member_generation: string;
  member_name: string;
  member_email: string;
  reservation_date: string;
  start_time: string;
  end_time: string;
  visitors: string;
  seat_type: string;
  seat_number: string;
}

const SeatLayout: React.FC = () => {
  const [canReservationSeat, setCanReservationSeat] = useState<string[]>([]);
  const [checkReservation, setCheckReservation] = useState<string>('');
  const [clickedSubmit, setClickedSubmit] = useState<boolean>(false);
  const [isReservationFail, setIsReservationFail] = useState<boolean>(false);
  const { email, username, course, generation } = useSelector(
    (state: RootState) => state.user,
  );
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
  // 서버 통신
  const [serverData, setServerData] = useState<ServerResponse>({});

  const fetchData = async (time: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/reservations/seat-check?reservation_date=${reservationInfo.reservation_date}`,
      );
      const serverDatas = response.data;
      setServerData(serverDatas);
      const seats = findAvailableSeats(serverDatas, time);
      setCanReservationSeat(seats);
    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(reservationInfo.time);
  }, []);

  useEffect(() => {
    const seats = findAvailableSeats(serverData, reservationInfo.time);
    setCanReservationSeat(seats);
  }, [reservationInfo.time]);

  useEffect(() => {
    fetchData(reservationInfo.time);
  }, [reservationInfo.reservation_date]);

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
        ? styles.visible
        : `${styles.visible} ${styles.alreadyReserved}`;
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

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  function PersonalSeatLayout({ className, clickEvent }: SeatLayoutProps) {
    return (
      <>
        <section className={className}>
          {personalSeatLayout(1, clickEvent)}
        </section>
        <section className={className}>
          {personalSeatLayout(7, clickEvent)}
        </section>
        <section className={className}>
          {personalSeatLayout(13, clickEvent)}
        </section>
        <section className={className}>
          {personalSeatLayout(19, clickEvent)}
        </section>
        <section className={className}>
          {personalSeatLayout(25, clickEvent)}
        </section>
      </>
    );
  }

  function FirstGroupSeatLayout({ className, clickEvent }: SeatLayoutProps) {
    return (
      <>
        <section className={`${styles.group} ${className}`}>
          {groupSeatLayout(31, clickEvent)}
        </section>
        <section className={`${styles.group} ${className}`}>
          {groupSeatLayout(33, clickEvent)}
        </section>
        <section className={`${styles.group} ${className}`}>
          {groupSeatLayout(35, clickEvent)}
        </section>
        <section className={`${styles.group} ${className}`}>
          {groupSeatLayout(37, clickEvent)}
        </section>
      </>
    );
  }

  function GraduateSeatLayout({ className, clickEvent }: SeatLayoutProps) {
    return (
      <>
        <section className={className}>
          {graduateSeatLayout(39, clickEvent)}
        </section>
        <section className={className}>
          {graduateSeatLayout(44, clickEvent)}
        </section>
      </>
    );
  }

  function SecondGroupSeatLayout({ className, clickEvent }: SeatLayoutProps) {
    return (
      <>
        <section className={`${styles.group} ${className}`}>
          {groupSeatLayout(49, clickEvent)}
        </section>
        <section className={`${styles.group} ${className}`}>
          {groupSeatLayout(51, clickEvent)}
        </section>
        <section className={`${styles.group} ${className}`}>
          {groupSeatLayout(53, clickEvent)}
        </section>
      </>
    );
  }

  function ClickPersonalSeat({ clickEvent }: SeatLayoutProps) {
    return (
      <>
        <section className={styles.seatKindContainer}>
          <article>
            <div className={styles.box}></div>
            <div className={styles.kindText}>다른좌석유형/이용불가</div>
          </article>
          <article>
            <div className={styles.box}></div>
            <div className={styles.kindText}>이용가능</div>
          </article>
        </section>
        <section className={selectedStyles.seatContainer}>
          <PersonalSeatLayout
            className={styles.possible}
            clickEvent={clickEvent}
          />
          <FirstGroupSeatLayout className={styles.impossible} />
          <GraduateSeatLayout className={styles.impossible} />
          <SecondGroupSeatLayout className={styles.impossible} />
          <div className={styles.entrance}>출입문</div>
        </section>
        <div className={styles.managerZone}>ManagerZone</div>
      </>
    );
  }

  function ClickGroupSeat({ clickEvent }: SeatLayoutProps) {
    return (
      <>
        <section className={styles.seatKindContainer}>
          <article>
            <div className={styles.box}></div>
            <div className={styles.kindText}>다른좌석유형/이용불가</div>
          </article>
          <article>
            <div className={styles.box}></div>
            <div className={styles.kindText}>이용가능 (4인석)</div>
          </article>
          <article>
            <div className={styles.box}></div>
            <div className={styles.kindText}>이용가능 (2인석)</div>
          </article>
        </section>
        <section className={selectedStyles.seatContainer}>
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
        </section>
        <div className={styles.managerZone}>ManagerZone</div>
      </>
    );
  }

  function ClickGraduateSeat({ clickEvent }: SeatLayoutProps) {
    return (
      <>
        <section className={styles.seatKindContainer}>
          <article>
            <div className={styles.box}></div>
            <div className={styles.kindText}>다른좌석유형/이용불가</div>
          </article>
          <article>
            <div className={styles.box}></div>
            <div className={styles.kindText}>이용가능 (개인석)</div>
          </article>
          <article>
            <div className={styles.box}></div>
            <div className={styles.kindText}>이용가능 (2인석)</div>
          </article>
        </section>
        <section className={selectedStyles.seatContainer}>
          <PersonalSeatLayout className={styles.impossible} />
          <FirstGroupSeatLayout className={styles.impossible} />
          <GraduateSeatLayout
            className={styles.possible}
            clickEvent={clickEvent}
          />
          <SecondGroupSeatLayout className={styles.impossible} />
          <div className={styles.entrance}>출입문</div>
        </section>
      </>
    );
  }

  function ClickMeetingRoom() {
    const [isReservationFail, setIsReservationFail] = useState(false);
    const [isVisiterNameInput, setIsVisiterNameInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    // const [meetingRoomNumber, setMeetingRoomNumber] = useState('');
    // // let meetingRoomNumber = '';
    // let typeList: string[] = [];
    // if (canReservationSeat.includes('A') && canReservationSeat.includes('B')) {
    //   typeList = ['미팅룸A (최대 6인)', '미팅룸B (최대 10인)'];
    // } else if (canReservationSeat.includes('A')) {
    //   typeList = ['미팅룸A (최대 6인)'];
    //   // setMeetingRoomNumber('A');
    //   setMeetingRoomNumber('A');
    // } else if (canReservationSeat.includes('B')) {
    //   typeList = ['미팅룸B (최대 10인)'];
    //   // setMeetingRoomNumber('B');
    //   setMeetingRoomNumber('B');
    // } else {
    //   typeList = [];
    // }

    // const handleMeetingRoomType = (value: string) => {
    //   // setMeetingRoomNumber(value.charAt(3));
    //   setMeetingRoomNumber(value.charAt(3));
    //   console.log(meetingRoomNumber);
    // };

    const [meetingRoomNumber, setMeetingRoomNumber] = useState('');
    const [typeList, setTypeList] = useState<string[]>([]);

    useEffect(() => {
      let typeList: string[] = [];
      if (
        canReservationSeat.includes('A') &&
        canReservationSeat.includes('B')
      ) {
        typeList = ['미팅룸A (최대 6인)', '미팅룸B (최대 10인)'];
      } else if (canReservationSeat.includes('A')) {
        typeList = ['미팅룸A (최대 6인)'];
        setMeetingRoomNumber('A');
      } else if (canReservationSeat.includes('B')) {
        typeList = ['미팅룸B (최대 10인)'];
        setMeetingRoomNumber('B');
      } else {
        typeList = [];
      }
      setTypeList(typeList);
    }, [canReservationSeat]);

    const handleMeetingRoomType = (value: string) => {
      setMeetingRoomNumber(value.charAt(3));
      console.log(meetingRoomNumber);
    };

    const handleClickSubmit = async () => {
      if (typeList.length === 0) {
        setIsReservationFail(true);
        return;
      }
      if (inputValue === '') {
        setIsVisiterNameInput(true);
        return;
      }
      dispatch(openConfirmModal());
      try {
        updateReservation({
          seat_number: meetingRoomNumber,
          visitors: inputValue,
        });
        console.log(reservationInfo);
      } catch (error) {
        setIsReservationFail(true);
        console.error(error);
      }
    };

    return (
      <section>
        <SingleSelector
          typeList={typeList}
          name='meetingRoomType'
          onSelect={handleMeetingRoomType}
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
      </section>
    );
  }

  const handleClickSeatNumber = (value: string) => {
    updateReservation({ seat_number: value });
    dispatch(openConfirmModal());
  };

  const handleModalController = async () => {
    const timeArray = reservationInfo.time
      .split(', ')
      .map(time => time.split('~'));
    const startTime = timeArray.map(time => time[0].trim());
    const endTime = timeArray.map(time => time[1].trim());

    try {
      for (let i = 0; i < timeArray.length; i++) {
        const request = {
          member_generation: `${course}/${generation}`,
          member_name: username,
          member_email: email,
          reservation_date: reservationInfo.reservation_date,
          start_time: startTime[i],
          end_time: endTime[i],
          visitors: reservationInfo.visitors,
          seat_type: reservationInfo.seat_type,
          seat_number: reservationInfo.seat_number,
        };

        const response = await axios.post<ResponseDataType>(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/reservations/`,
          request,
          {
            withCredentials: true,
          },
        );

        setClickedSubmit(true);
      }
      fetchData(reservationInfo.time);
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
      {clickedSubmit && (
        <SubmitModal
          onClick={() => {
            setClickedSubmit(false);
            fetchData(reservationInfo.time);
          }}
        />
      )}
      {isReservationFail && (
        <AlertModal
          modalMessage1='좌석 예약에 실패하였습니다.🥹'
          modalMessage2='다시 시도해주세요.'
          onClick={() => {
            setIsReservationFail(false);
            fetchData(reservationInfo.time);
          }}
        />
      )}
    </>
  );
};

export default SeatLayout;
