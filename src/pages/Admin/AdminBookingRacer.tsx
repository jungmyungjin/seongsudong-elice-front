import React, { useState, useEffect } from 'react';

import CustomLink from 'components/common/Link';
import DateInput from 'components/common/DateInput';
import SeatOption from 'components/SeatOption';
import styles from './AdminBookingRacer.module.scss';
import BookingState from 'components/BookingState';
import { getDate, getHour } from 'utils/getTime';

// 예약 페이지에서 저장하는 값과 맞춰야한다.
// zone, seat 등 형식이 일치하지 않으면 select option 사용이 곤란함.
// seat은 검색에 사용
//
export const dummyData = [
  {
    id: 1,
    date: '2023-06-05',
    startTime: '10:00',
    endTime: '14:00',
    zone: '개인석',
    seat: '1',
    subscriber: '박기영',
  },
  {
    id: 2,
    date: '2023-06-05',
    startTime: '14:00',
    endTime: '18:00',
    zone: '개인석',
    seat: '1',
    subscriber: '성치호',
  },
  {
    id: 3,
    date: '2023-06-05',
    startTime: '18:00',
    endTime: '22:00',
    zone: '개인석',
    seat: '1',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 4,
    date: '2023-06-05',
    startTime: '10:00',
    endTime: '14:00',
    zone: '개인석',
    seat: '2',
    subscriber: '박기영',
  },
  {
    id: 5,
    date: '2023-06-05',
    startTime: '14:00',
    endTime: '18:00',
    zone: '개인석',
    seat: '2',
    subscriber: '성치호',
  },
  {
    id: 6,
    date: '2023-06-05',
    startTime: '18:00',
    endTime: '22:00',
    zone: '개인석',
    seat: '2',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 7,
    date: '2023-05-29',
    startTime: '10:00',
    endTime: '14:00',
    zone: '개인석',
    seat: '1',
    subscriber: '박기영',
  },
  {
    id: 8,
    date: '2023-05-29',
    startTime: '14:00',
    endTime: '18:00',
    zone: '개인석',
    seat: '12',
    subscriber: '성치호',
  },
  {
    id: 9,
    date: '2023-05-29',
    startTime: '18:00',
    endTime: '22:00',
    zone: '개인석',
    seat: '81',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 10,
    date: '2023-05-29',
    startTime: '10:00',
    endTime: '14:00',
    zone: '개인석',
    seat: '72',
    subscriber: '박기영',
  },
  {
    id: 11,
    date: '2023-05-29',
    startTime: '14:00',
    endTime: '18:00',
    zone: '개인석',
    seat: '3',
    subscriber: '성치호',
  },
  {
    id: 12,
    date: '2023-05-29',
    startTime: '18:00',
    endTime: '22:00',
    zone: '개인석',
    seat: '34',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 13,
    date: '2023-06-01',
    startTime: '10:00',
    endTime: '14:00',
    zone: '개인석',
    seat: '1',
    subscriber: '박기영',
  },
  {
    id: 14,
    date: '2023-06-01',
    startTime: '14:00',
    endTime: '18:00',
    zone: '개인석',
    seat: '3',
    subscriber: '성치호',
  },
  {
    id: 15,
    date: '2023-06-01',
    startTime: '18:00',
    endTime: '22:00',
    zone: '개인석',
    seat: '3',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 16,
    date: '2023-06-01',
    startTime: '10:00',
    endTime: '14:00',
    zone: '미팅',
    seat: 'A',
    subscriber: '박기영',
  },
  {
    id: 17,
    date: '2023-06-01',
    startTime: '14:00',
    endTime: '18:00',
    zone: '미팅',
    seat: 'A',
    subscriber: '성치호',
  },
  {
    id: 18,
    date: '2023-06-01',
    startTime: '18:00',
    endTime: '22:00',
    zone: '미팅',
    seat: 'A',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 19,
    date: '2023-06-01',
    startTime: '10:00',
    endTime: '14:00',
    zone: '미팅',
    seat: 'B',
    subscriber: '박기영',
  },
  {
    id: 20,
    date: '2023-06-01',
    startTime: '14:00',
    endTime: '18:00',
    zone: '미팅',
    seat: 'B',
    subscriber: '성치호',
  },
  {
    id: 21,
    date: '2023-06-01',
    startTime: '18:00',
    endTime: '22:00',
    zone: '미팅',
    seat: 'B',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 22,
    date: '2023-06-01',
    startTime: '10:00',
    endTime: '14:00',
    zone: '개인석',
    // seatType: "개인석",
    seat: '21',
    subscriber: '박기영',
  },
  {
    id: 23,
    date: '2023-06-01',
    startTime: '14:00',
    endTime: '18:00',
    zone: '개인석',
    seat: '21',
    subscriber: '성치호',
  },
  {
    id: 24,
    date: '2023-06-01',
    startTime: '18:00',
    endTime: '22:00',
    zone: '개인석',
    seat: '21',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 25,
    date: '2023-06-07',
    startTime: '10:00',
    endTime: '14:00',
    zone: '개인석',
    seat: '67',
    subscriber: '박기영',
  },
  {
    id: 26,
    date: '2023-06-07',
    startTime: '14:00',
    endTime: '18:00',
    zone: '개인석',
    seat: '25',
    subscriber: '성치호',
  },
  {
    id: 27,
    date: '2023-06-07',
    startTime: '18:00',
    endTime: '22:00',
    zone: '개인석',
    seat: '81',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 28,
    date: '2023-06-07',
    startTime: '10:00',
    endTime: '14:00',
    zone: '개인석',
    seat: '76',
    subscriber: '박기영',
  },
  {
    id: 29,
    date: '2023-06-07',
    startTime: '14:00',
    endTime: '18:00',
    zone: '개인석',
    seat: '52',
    subscriber: '성치호',
  },
  {
    id: 30,
    date: '2023-06-07',
    startTime: '18:00',
    endTime: '22:00',
    zone: '개인석',
    seat: '18',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 31,
    date: '2023-06-07',
    startTime: '10:00',
    endTime: '14:00',
    zone: '개인석',
    seat: '77',
    subscriber: '박기영',
  },
  {
    id: 32,
    date: '2023-06-07',
    startTime: '14:00',
    endTime: '18:00',
    zone: '개인석',
    seat: '53',
    subscriber: '성치호',
  },
  {
    id: 33,
    date: '2023-06-07',
    startTime: '18:00',
    endTime: '22:00',
    zone: '개인석',
    seat: '19',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 34,
    date: '2023-06-07',
    startTime: '10:00',
    endTime: '14:00',
    zone: '팀플석',
    seat: '37',
    subscriber: '박기영',
  },
  {
    id: 35,
    date: '2023-06-07',
    startTime: '14:00',
    endTime: '18:00',
    zone: '팀플석',
    seat: '10',
    subscriber: '성치호',
  },
  {
    id: 36,
    date: '2023-06-07',
    startTime: '18:00',
    endTime: '22:00',
    zone: '팀플석',
    seat: '59',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 37,
    date: '2023-06-07',
    startTime: '10:00',
    endTime: '14:00',
    zone: '팀플석',
    seat: '51',
    subscriber: '박기영',
  },
  {
    id: 38,
    date: '2023-06-07',
    startTime: '14:00',
    endTime: '18:00',
    zone: '팀플석',
    seat: '9',
    subscriber: '성치호',
  },
  {
    id: 39,
    date: '2023-06-07',
    startTime: '18:00',
    endTime: '22:00',
    zone: '팀플석',
    seat: '82',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 40,
    date: '2023-06-07',
    startTime: '10:00',
    endTime: '14:00',
    zone: '미팅룸',
    seat: 'A',
    subscriber: '박기영',
  },
  {
    id: 41,
    date: '2023-06-07',
    startTime: '14:00',
    endTime: '18:00',
    zone: '미팅룸',
    seat: 'A',
    subscriber: '성치호',
  },
  {
    id: 42,
    date: '2023-06-07',
    startTime: '18:00',
    endTime: '22:00',
    zone: '미팅룸',
    seat: 'A',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 43,
    date: '2023-06-07',
    startTime: '10:00',
    endTime: '14:00',
    zone: '미팅룸',
    seat: 'B',
    subscriber: '박기영',
  },
  {
    id: 44,
    date: '2023-06-07',
    startTime: '14:00',
    endTime: '18:00',
    zone: '미팅룸',
    seat: 'B',
    subscriber: '성치호',
  },
  {
    id: 45,
    date: '2023-06-07',
    startTime: '18:00',
    endTime: '22:00',
    zone: '미팅룸',
    seat: 'B',
    subscriber: '신하영',
  },
];

const menuArr = [
  {
    id: 1,
    to: '/admin/booking',
    icon: 'bookmark',
    title: '레이서 예약 현황 관리',
    right: false,
  },
];

function AdminBookingRacer() {
  const [date, setDate] = useState('');
  const [zoneState, setZoneState] = useState('');
  const [bookingData, setBookingData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [seatInput, setSeatInput] = useState('');
  const [showOnlyCurrent, setShowOnlyCurrent] = useState(false);

  const currentHour = getHour();

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
    // 퇴장 기능 구현
    const isLeave = window.confirm('퇴실 처리를 진행하시겠습니까?');

    if (!isLeave) {
      return;
    }

    const deleteReservation = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/admin/delete-reservation/${bookingId}`,
        );

        if (!response.ok) {
          throw new Error('퇴실 처리 중 에러가 발생했습니다.');
        }

        const data = response.json();

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    deleteReservation();

    const updatedBookingData = bookingData.filter(
      (data: any) => data.reservation_id !== bookingId,
    );

    setBookingData(updatedBookingData);

    // useEffect때문에 필터 데이터를 굳이 업데이트 안해도 자동으로 될 삘인뎅??
    // const updatedFilteredData = filteredData.filter(
    //   (data: any) => data.reservation_id !== bookingId,
    // );

    // setFilteredData(updatedFilteredData);

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
      {menuArr.map(item => (
        <CustomLink
          key={item.id}
          to={item.to}
          title={item.title}
          icon={item.icon}
          right={item.right}
        />
      ))}

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
