import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CustomLink from 'components/common/Link';
import DateInput from 'components/common/DateInput';
import SeatOption from 'components/SeatOption';
import styles from './AdminBookingRacer.module.scss';
import BookingState from 'components/BookingState';
import { getDate, getHour } from 'utils/getTime';
import { RootState } from 'store/configureStore';

function AdminBookingRacer() {
  const [date, setDate] = useState('');
  const [zoneState, setZoneState] = useState('');
  const [bookingData, setBookingData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [seatInput, setSeatInput] = useState('');
  const [showOnlyCurrent, setShowOnlyCurrent] = useState(false);

  const currentHour = getHour();

  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const zoneChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setZoneState(e.target.value);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeatInput(e.target.value);
  };

  const goodbyeHandler = (bookingId: number) => {
    // if (!loggedIn) {
    //   return alert('로그인이 필요한 기능입니다.');
    // }

    // if (!isAdmin) {
    //   return alert('관리자 권한이 없습니다.');
    // }

    const isLeave = window.confirm('퇴실 처리를 진행하시겠습니까?');

    if (!isLeave) {
      return;
    }

    const deleteReservation = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/admin/delete-reservation/${bookingId}`,
          {
            method: 'DELETE',
          },
        );

        if (!response.ok) {
          throw new Error('퇴실 처리 중 에러가 발생했습니다.');
        }
      } catch (err) {
        console.log(err);
      }
    };

    deleteReservation();

    const updatedBookingData = bookingData.filter(
      (data: any) => data.reservation_id !== bookingId,
    );

    setBookingData(updatedBookingData);

    alert('퇴실 처리가 완료되었습니다.');
  };

  const toggleOnlyCurrentHandler = () => {
    setShowOnlyCurrent(prev => !prev);
  };

  useEffect(() => {
    setFilteredData(bookingData);
  }, [bookingData]);

  useEffect(() => {
    if (date === '') {
      return;
    }

    // if (!loggedIn) {
    //   return alert('로그인이 필요한 기능입니다.');
    // }

    // if (!isAdmin) {
    //   return alert('관리자 권한이 없습니다.');
    // }

    const getReservationData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/admin/reservations/${date}`,
        );

        if (!response.ok) {
          throw new Error('예약 정보를 얻는 데 실패했습니다.');
        }

        const data = await response.json();

        setBookingData(data.reservations);
      } catch (err) {
        console.log(err);
      }
    };

    getReservationData();
  }, [date]);

  useEffect(() => {
    if (date === '') {
      return;
    }

    if (!showOnlyCurrent) {
      if (zoneState === '') {
        const filteringData = bookingData.filter(
          (data: any) =>
            data.reservation_date === date &&
            data.seat_number.includes(seatInput),
        );

        setFilteredData(filteringData);

        return;
      }

      const filteringData = bookingData.filter(
        (data: any) =>
          data.reservation_date === date &&
          data.seat_type === zoneState &&
          data.seat_number.includes(seatInput),
      );

      setFilteredData(filteringData);

      return;
    }

    if (zoneState === '') {
      const filteringData = bookingData.filter(
        (data: any) =>
          data.reservation_date === date &&
          data.start_time <= currentHour &&
          data.end_time > currentHour &&
          data.seat_number.includes(seatInput),
      );

      setFilteredData(filteringData);

      return;
    }

    const filteringData = bookingData.filter(
      (data: any) =>
        data.reservation_date === date &&
        data.start_time <= currentHour &&
        data.end_time > currentHour &&
        data.seat_type === zoneState &&
        data.seat_number.includes(seatInput),
    );

    setFilteredData(filteringData);
  }, [zoneState, date, showOnlyCurrent, seatInput, bookingData]);

  return (
    <div className={styles.racer}>
      <CustomLink
        to='/admin/booking'
        title='레이서 예약 현황 관리'
        icon='bookmark'
        right={false}
      />

      <DateInput
        date={date}
        changeHandler={dateChangeHandler}
        isFullRange={true}
      />

      <SeatOption
        zoneOption={zoneState}
        zoneChangeHandler={zoneChangeHandler}
        seatInput={seatInput}
        inputHandler={inputChangeHandler}
      />

      <BookingState
        date={date}
        toggleOnlyCurrentHandler={toggleOnlyCurrentHandler}
        showOnlyCurrent={showOnlyCurrent}
        filteredData={filteredData}
        currentHour={currentHour}
        goodbyeHandler={goodbyeHandler}
      />
    </div>
  );
}

export default AdminBookingRacer;
