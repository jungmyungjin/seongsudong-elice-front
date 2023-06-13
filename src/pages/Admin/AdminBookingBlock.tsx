import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CustomLink from 'components/common/Link';
import DateInput from 'components/common/DateInput';
import SeatNumberInput from 'components/SeatNumberInput';
import TimeSelect from 'components/TimeSelect';
import styles from './adminBookingBlock.module.scss';
import BookingTable from 'components/BookingTable';
import { RootState } from 'store/configureStore';

function AdminBookingBlock() {
  const [date, setDate] = useState('');
  const [zoneState, setZoneState] = useState('');
  const [seatStartNumber, setSeatStartNumber] = useState('');
  const [seatEndNumber, setSeatEndNumber] = useState('');
  const [checkedLabel, setCheckedLabel] = useState('');
  const [filteredData, setFilteredData] = useState<any>([]);
  const [bookingData, setBookingData] = useState<any>([]);

  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const email = useSelector((state: RootState) => state.user.email);
  const generation = useSelector((state: RootState) => state.user.course);
  const name = useSelector((state: RootState) => state.user.username);

  const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const zoneChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setZoneState(e.target.value);
  };

  const seatStartHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeatStartNumber(e.target.value);
  };

  const seatEndHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeatEndNumber(e.target.value);
  };

  const checkHandler = (e: React.MouseEvent<HTMLLabelElement>) => {
    if ((e.target as HTMLElement).tagName === 'INPUT') {
      return;
    }

    const id = (e.target as HTMLLabelElement).htmlFor;

    setCheckedLabel(id);
  };

  const checkRangeIsValid = (
    startString: string,
    endString: string = seatEndNumber,
  ) => {
    // 개인석 1~30 => 30개
    // 단체석 31~38 / 49~54 => 14개
    // 수료기수석 39~48 => 10개
    // zoneState가 미팅룸인 경우에는 A 혹은 B만 입력받는다.

    let start: string | number = startString;

    let end: string | number;

    if (endString === '') {
      end = start;
    } else {
      end = endString;
    }

    if (zoneState === '미팅룸') {
      if ((start !== 'A' && start !== 'B') || (end !== 'A' && end !== 'B')) {
        return false;
      }

      return true;
    }

    const singleStart = 1;
    const singleEnd = 30;
    const groupStart1 = 31;
    const groupEnd1 = 38;
    const groupdStart2 = 49;
    const groupEnd2 = 54;
    const graduateStart = 39;
    const graduateEnd = 48;

    start = parseInt(startString);

    if (endString === '') {
      end = start;
    } else {
      end = parseInt(endString);
    }

    if (zoneState === '개인석') {
      if (
        start < singleStart ||
        start > singleEnd ||
        end < singleStart ||
        end > singleEnd
      ) {
        return false;
      }

      return true;
    }

    if (zoneState === '팀플석') {
      if (
        start < groupStart1 ||
        (start > groupEnd1 && start < groupdStart2) ||
        start > groupEnd2 ||
        end < groupStart1 ||
        (end > groupEnd1 && end < groupdStart2) ||
        end > groupEnd2
      ) {
        return false;
      }

      return true;
    }

    if (zoneState === '수료기수석') {
      if (
        start < graduateStart ||
        start > graduateEnd ||
        end < graduateStart ||
        end > graduateEnd
      ) {
        return false;
      }

      return true;
    }
  };

  const compareStartAndEnd = (
    startString: string,
    endString: string,
  ): boolean => {
    if (zoneState === '미팅룸') {
      if (startString >= endString) {
        return false;
      }

      return true;
    }

    if (parseInt(seatStartNumber) >= parseInt(seatEndNumber)) {
      return false;
    }

    return true;
  };

  const getTimeOfReservation = () => {
    let startTime;
    let endTime;

    if (checkedLabel === 'time1014') {
      startTime = '10:00';
      endTime = '14:00';
    } else if (checkedLabel === 'time1418') {
      startTime = '14:00';
      endTime = '18:00';
    } else {
      startTime = '18:00';
      endTime = '22:00';
    }

    return [startTime, endTime];
  };

  const getSeatRange = (start: string, end: string = seatEndNumber) => {
    if (zoneState === '미팅룸') {
      if (end === '') {
        return [start];
      }

      return [start, end];
    }

    let seatArrLength;
    let seatArr;

    if (end === '') {
      seatArrLength = 1;
    } else {
      seatArrLength = parseInt(end) - parseInt(start) + 1;
    }

    seatArr = Array.from({ length: seatArrLength }).map(
      (_, index) => index + parseInt(start),
    );

    return seatArr;
  };

  const blockHandler = async () => {
    if (!loggedIn) {
      return alert('로그인이 필요한 기능입니다.');
    }

    if (!isAdmin) {
      return alert('관리자 권한이 없습니다.');
    }

    // 날짜 선택 필요
    if (date === '') {
      return alert('날짜를 선택해주세요.');
    }

    // 시간 선택 필요
    if (checkedLabel === '') {
      return alert('시간대를 선택해주세요.');
    }

    // 존 선택 필요
    if (zoneState === '') {
      return alert('공간을 선택해주세요.');
    }

    // 좌석 번호 입력 필요
    if (seatStartNumber === '') {
      return alert('시작 좌석 번호는 반드시 입력해주세요.');
    }

    let seatArr;

    if (seatEndNumber === '') {
      // 좌석 번호 최대 최소 범위 검증 필요
      if (!checkRangeIsValid(seatStartNumber)) {
        return alert('선택하신 존에 존재하지 않는 좌석입니다.');
      }

      seatArr = getSeatRange(seatStartNumber);
    } else {
      if (!checkRangeIsValid(seatStartNumber, seatEndNumber)) {
        return alert(
          '선택한 구역에 존재하지 않는 좌석입니다. 좌석 범위를 확인해주세요.',
        );
      }

      if (!compareStartAndEnd(seatStartNumber, seatEndNumber)) {
        return alert('시작 좌석 번호는 끝 좌석 번호보다 작아야합니다.');
      }

      seatArr = getSeatRange(seatStartNumber, seatEndNumber);
    }

    const [startTime, endTime] = getTimeOfReservation();

    try {
      const response = await Promise.all(
        seatArr.map((seat: number | string) => {
          const data = {
            member_generation: generation,
            member_name: name,
            member_email: email,
            reservation_date: date,
            start_time: startTime,
            end_time: endTime,
            seat_number: seat.toString(),
            seat_type: zoneState,
            visitors: '',
          };

          return fetch(
            `${process.env.REACT_APP_BACKEND_ADDRESS}/reservations`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
              credentials: 'include',
            },
          );
        }),
      );

      await Promise.all(
        response.map(async res => {
          if (!res.ok) {
            throw new Error('예약 중 에러가 발생했습니다.');
          }
        }),
      );

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/admin/reservations/${date}`,
        {
          credentials: 'include',
        },
      );

      if (!res.ok) {
        throw new Error('예약 조회 중 에러가 발생했습니다.');
      }

      const data = await res.json();

      const dataSortedBySeatNumber = data.reservations.sort(
        (a: any, b: any) => parseInt(a.seat_number) - parseInt(b.seat_number),
      );

      setBookingData(dataSortedBySeatNumber);

      alert('예약 제한이 완료되었습니다.');

      setZoneState('');
      setSeatStartNumber('');
      setSeatEndNumber('');
      setCheckedLabel('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (date === '') {
      return;
    }

    if (!loggedIn) {
      return alert('로그인이 필요한 기능입니다.');
    }

    if (!isAdmin) {
      return alert('관리자 권한이 없습니다.');
    }

    const getReservationData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/admin/reservations/${date}`,
          {
            credentials: 'include',
          },
        );

        if (!response.ok) {
          throw new Error('예약 조회 중 에러가 발생했습니다.');
        }

        const data = await response.json();

        const dataSortedBySeatNumber = data.reservations.sort(
          (a: any, b: any) => parseInt(a.seat_number) - parseInt(b.seat_number),
        );

        setBookingData(dataSortedBySeatNumber);
      } catch (err) {
        console.log(err);
      }
    };

    getReservationData();
  }, [date]);

  useEffect(() => {
    const [startTime, endTime] = getTimeOfReservation();

    if (zoneState === '') {
      const filtering = bookingData.filter(
        (data: any) =>
          data.reservation_date === date &&
          data.start_time === startTime &&
          data.end_time === endTime,
      );

      setFilteredData(filtering);

      return;
    }

    const filtering = bookingData.filter(
      (data: any) =>
        data.reservation_date === date &&
        data.start_time === startTime &&
        data.end_time === endTime &&
        data.seat_type === zoneState,
    );

    setFilteredData(filtering);
  }, [date, checkedLabel, zoneState, bookingData]);

  useEffect(() => {
    setFilteredData(bookingData);
  }, [bookingData]);

  const cancelHandler = async () => {
    if (!loggedIn) {
      return alert('로그인이 필요한 기능입니다.');
    }

    if (!isAdmin) {
      return alert('관리자 권한이 없습니다.');
    }

    // 날짜 선택 필요
    if (date === '') {
      return alert('날짜를 선택해주세요.');
    }

    // 시간 선택 필요
    if (checkedLabel === '') {
      return alert('시간대를 선택해주세요.');
    }

    // 존 선택 필요
    if (zoneState === '') {
      return alert('공간을 선택해주세요.');
    }

    // 좌석 번호 입력 필요
    if (seatStartNumber === '') {
      return alert('시작 좌석 번호는 반드시 입력해주세요.');
    }

    let seatArr;

    if (seatEndNumber === '') {
      // 좌석 번호 최대 최소 범위 검증 필요
      if (!checkRangeIsValid(seatStartNumber)) {
        return alert('선택하신 존에 존재하지 않는 좌석입니다.');
      }

      seatArr = getSeatRange(seatStartNumber);
    } else {
      if (!checkRangeIsValid(seatStartNumber, seatEndNumber)) {
        return alert(
          '선택한 구역에 존재하지 않는 좌석입니다. 좌석 범위를 확인해주세요.',
        );
      }

      if (!compareStartAndEnd(seatStartNumber, seatEndNumber)) {
        return alert('시작 좌석 번호는 끝 좌석 번호보다 작아야합니다.');
      }

      seatArr = getSeatRange(seatStartNumber, seatEndNumber);
    }

    const [startTime, endTime] = getTimeOfReservation();

    let filtering: any[] = [];

    seatArr.map(seat => {
      const filteredData = bookingData.filter(
        (data: any) =>
          data.reservation_date === date &&
          data.start_time === startTime &&
          data.end_time === endTime &&
          data.seat_type === zoneState &&
          parseInt(data.seat_number) === seat,
      );

      filtering.push(...filteredData);
    });

    try {
      const response = await Promise.all(
        filtering.map(reservation => {
          return fetch(
            `${process.env.REACT_APP_BACKEND_ADDRESS}/admin/delete-reservation/${reservation.reservation_id}`,
            {
              method: 'DELETE',
              credentials: 'include',
            },
          );
        }),
      );

      await Promise.all(
        response.map(async res => {
          if (!res.ok) {
            throw new Error('좌석 해제 중 에러가 발생했습니다.');
          }
        }),
      );

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/admin/reservations/${date}`,
        {
          credentials: 'include',
        },
      );

      if (!res.ok) {
        throw new Error('예약 조회 중 에러가 발생했습니다.');
      }

      const data = await res.json();

      const dataSortedBySeatNumber = data.reservations.sort(
        (a: any, b: any) => parseInt(a.seat_number) - parseInt(b.seat_number),
      );

      setBookingData(dataSortedBySeatNumber);

      alert('좌석이 해제되었습니다.');

      setZoneState('');
      setSeatStartNumber('');
      setSeatEndNumber('');
      setCheckedLabel('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.bookingBlock}>
      <CustomLink
        to='/admin/booking'
        title='예약 제한하기'
        icon='bookmark-block'
        right={false}
      />

      <DateInput
        date={date}
        changeHandler={dateChangeHandler}
        isFullRange={false}
      />

      <TimeSelect checkHandler={checkHandler} checkedLabel={checkedLabel} />

      <SeatNumberInput
        zoneOption={zoneState}
        zoneChangeHandler={zoneChangeHandler}
        seatStartNumber={seatStartNumber}
        seatStartHandler={seatStartHandler}
        seatEndNumber={seatEndNumber}
        seatEndHandler={seatEndHandler}
      />

      <div className={styles.btnDiv}>
        <button onClick={blockHandler}>제한하기</button>

        <button onClick={cancelHandler}>취소하기</button>
      </div>

      <BookingTable tableData={filteredData} />
    </div>
  );
}

export default AdminBookingBlock;
