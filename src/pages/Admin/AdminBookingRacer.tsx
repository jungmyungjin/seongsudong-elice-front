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
const dummyData = [
  {
    id: 1,
    date: '2023-05-28',
    startTime: '10',
    endTime: '14',
    zone: '개인석',
    seat: '1',
    subscriber: '박기영',
  },
  {
    id: 2,
    date: '2023-05-28',
    startTime: '14',
    endTime: '18',
    zone: '개인석',
    seat: '1',
    subscriber: '성치호',
  },
  {
    id: 3,
    date: '2023-05-28',
    startTime: '18',
    endTime: '22',
    zone: '개인석',
    seat: '1',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 4,
    date: '2023-05-28',
    startTime: '10',
    endTime: '14',
    zone: '개인석',
    seat: '2',
    subscriber: '박기영',
  },
  {
    id: 5,
    date: '2023-05-28',
    startTime: '14',
    endTime: '18',
    zone: '개인석',
    seat: '2',
    subscriber: '성치호',
  },
  {
    id: 6,
    date: '2023-05-28',
    startTime: '18',
    endTime: '22',
    zone: '개인석',
    seat: '2',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 7,
    date: '2023-05-29',
    startTime: '10',
    endTime: '14',
    zone: '개인석',
    seat: '1',
    subscriber: '박기영',
  },
  {
    id: 8,
    date: '2023-05-29',
    startTime: '14',
    endTime: '18',
    zone: '개인석',
    seat: '12',
    subscriber: '성치호',
  },
  {
    id: 9,
    date: '2023-05-29',
    startTime: '18',
    endTime: '22',
    zone: '개인석',
    seat: '81',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 10,
    date: '2023-05-29',
    startTime: '10',
    endTime: '14',
    zone: '개인석',
    seat: '72',
    subscriber: '박기영',
  },
  {
    id: 11,
    date: '2023-05-29',
    startTime: '14',
    endTime: '18',
    zone: '개인석',
    seat: '3',
    subscriber: '성치호',
  },
  {
    id: 12,
    date: '2023-05-29',
    startTime: '18',
    endTime: '22',
    zone: '개인석',
    seat: '34',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 13,
    date: '2023-06-01',
    startTime: '10',
    endTime: '14',
    zone: '개인석',
    seat: '1',
    subscriber: '박기영',
  },
  {
    id: 14,
    date: '2023-06-01',
    startTime: '14',
    endTime: '18',
    zone: '개인석',
    seat: '3',
    subscriber: '성치호',
  },
  {
    id: 15,
    date: '2023-06-01',
    startTime: '18',
    endTime: '22',
    zone: '개인석',
    seat: '3',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 16,
    date: '2023-06-01',
    startTime: '10',
    endTime: '14',
    zone: '미팅',
    seat: 'A',
    subscriber: '박기영',
  },
  {
    id: 17,
    date: '2023-06-01',
    startTime: '14',
    endTime: '18',
    zone: '미팅',
    seat: 'A',
    subscriber: '성치호',
  },
  {
    id: 18,
    date: '2023-06-01',
    startTime: '18',
    endTime: '22',
    zone: '미팅',
    seat: 'A',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 19,
    date: '2023-06-01',
    startTime: '10',
    endTime: '14',
    zone: '미팅',
    seat: 'B',
    subscriber: '박기영',
  },
  {
    id: 20,
    date: '2023-06-01',
    startTime: '14',
    endTime: '18',
    zone: '미팅',
    seat: 'B',
    subscriber: '성치호',
  },
  {
    id: 21,
    date: '2023-06-01',
    startTime: '18',
    endTime: '22',
    zone: '미팅',
    seat: 'B',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 22,
    date: '2023-06-01',
    startTime: '10',
    endTime: '14',
    zone: '개인석',
    // seatType: "개인석",
    seat: '21',
    subscriber: '박기영',
  },
  {
    id: 23,
    date: '2023-06-01',
    startTime: '14',
    endTime: '18',
    zone: '개인석',
    seat: '21',
    subscriber: '성치호',
  },
  {
    id: 24,
    date: '2023-06-01',
    startTime: '18',
    endTime: '22',
    zone: '개인석',
    seat: '21',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 25,
    date: '2023-06-02',
    startTime: '10',
    endTime: '14',
    zone: '개인석',
    seat: '67',
    subscriber: '박기영',
  },
  {
    id: 26,
    date: '2023-06-02',
    startTime: '14',
    endTime: '18',
    zone: '개인석',
    seat: '25',
    subscriber: '성치호',
  },
  {
    id: 27,
    date: '2023-06-02',
    startTime: '18',
    endTime: '22',
    zone: '개인석',
    seat: '81',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 28,
    date: '2023-06-02',
    startTime: '10',
    endTime: '14',
    zone: '개인석',
    seat: '76',
    subscriber: '박기영',
  },
  {
    id: 29,
    date: '2023-06-02',
    startTime: '14',
    endTime: '18',
    zone: '개인석',
    seat: '52',
    subscriber: '성치호',
  },
  {
    id: 30,
    date: '2023-06-02',
    startTime: '18',
    endTime: '22',
    zone: '개인석',
    seat: '18',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 31,
    date: '2023-06-02',
    startTime: '10',
    endTime: '14',
    zone: '개인석',
    seat: '77',
    subscriber: '박기영',
  },
  {
    id: 32,
    date: '2023-06-02',
    startTime: '14',
    endTime: '18',
    zone: '개인석',
    seat: '53',
    subscriber: '성치호',
  },
  {
    id: 33,
    date: '2023-06-02',
    startTime: '18',
    endTime: '22',
    zone: '개인석',
    seat: '19',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 34,
    date: '2023-06-02',
    startTime: '10',
    endTime: '14',
    zone: '팀플석(4인)',
    seat: '37',
    subscriber: '박기영',
  },
  {
    id: 35,
    date: '2023-06-02',
    startTime: '14',
    endTime: '18',
    zone: '팀플석(4인)',
    seat: '10',
    subscriber: '성치호',
  },
  {
    id: 36,
    date: '2023-06-02',
    startTime: '18',
    endTime: '22',
    zone: '팀플석(4인)',
    seat: '59',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 37,
    date: '2023-06-02',
    startTime: '10',
    endTime: '14',
    zone: '팀플석(2인)',
    seat: '51',
    subscriber: '박기영',
  },
  {
    id: 38,
    date: '2023-06-02',
    startTime: '14',
    endTime: '18',
    zone: '팀플석(2인)',
    seat: '9',
    subscriber: '성치호',
  },
  {
    id: 39,
    date: '2023-06-02',
    startTime: '18',
    endTime: '22',
    zone: '팀플석(2인)',
    seat: '82',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 40,
    date: '2023-06-02',
    startTime: '10',
    endTime: '14',
    zone: '미팅룸',
    seat: 'A',
    subscriber: '박기영',
  },
  {
    id: 41,
    date: '2023-06-02',
    startTime: '14',
    endTime: '18',
    zone: '미팅룸',
    seat: 'A',
    subscriber: '성치호',
  },
  {
    id: 42,
    date: '2023-06-02',
    startTime: '18',
    endTime: '22',
    zone: '미팅룸',
    seat: 'A',
    subscriber: '신하영',
  },
  //////////////////////////////////////////
  {
    id: 43,
    date: '2023-06-02',
    startTime: '10',
    endTime: '14',
    zone: '미팅룸',
    seat: 'B',
    subscriber: '박기영',
  },
  {
    id: 44,
    date: '2023-06-02',
    startTime: '14',
    endTime: '18',
    zone: '미팅룸',
    seat: 'B',
    subscriber: '성치호',
  },
  {
    id: 45,
    date: '2023-06-02',
    startTime: '18',
    endTime: '22',
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
  const [filteredData, setFilteredData] = useState<any>('');
  const [seatInput, setSeatInput] = useState('');
  const [currentDate, setCurrentDate] = useState(getDate());
  const [currentHour, setCurrentHour] = useState(getHour());
  const [showOnlyCurrent, setShowOnlyCurrent] = useState(false);

  const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const zoneChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setZoneState(e.target.value);

    // 매번 이 버튼을 초기화하는게 과연 UX에 좋은가?
    // setShowOnlyCurrent(false);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeatInput(e.target.value);

    // 아래 코드를 useEffect로 옮길 수 없나?

    // // zoneState는 초기에는 '', 이후 -공간 선택-을 선택하면 default가 된다.
    // if (zoneState === 'default' || zoneState === '') {
    //   const filteringData = bookingData.filter((data: any) =>
    //     data.seat.includes(e.target.value),
    //   );

    //   setFilteredData(filteringData);

    //   return;
    // }

    // const filteringData = bookingData.filter(
    //   (data: any) =>
    //     data.seat.includes(e.target.value) && data.zone === zoneState,
    // );

    // setFilteredData(filteringData);
  };

  useEffect(() => {
    // zoneState는 초기에는 '', 이후 -공간 선택-을 선택하면 default가 된다.
    if (zoneState === 'default' || zoneState === '') {
      const filteringData = bookingData.filter((data: any) =>
        data.seat.includes(seatInput),
      );

      setFilteredData(filteringData);

      return;
    }

    const filteringData = bookingData.filter(
      (data: any) => data.seat.includes(seatInput) && data.zone === zoneState,
    );

    setFilteredData(filteringData);
  }, [seatInput]);

  const goodbyeHandler = (bookingId: number) => {
    // 퇴장 기능 구현
    const isLeave = window.confirm('퇴실 처리를 진행하시겠습니까?');

    if (!isLeave) {
      return;
    }

    // 예약 데이터 삭제 API
    // 원본 데이터,즉, bookingData까지도 업데이트 되어야함.
    // filteredData만 변경하게 되면 다른 날짜나 좌석으로 이동시 화면상으로는 초기화된 것으로 보일 것..
    const updatedBookingData = bookingData.filter(
      (data: any) => data.id !== bookingId,
    );

    setBookingData(updatedBookingData);

    const updatedFilteredData = filteredData.filter(
      (data: any) => data.id !== bookingId,
    );

    setFilteredData(updatedFilteredData);

    alert('퇴실 처리가 완료되었습니다.');
  };

  const toogleOnlyCurrentHandler = () => {
    setShowOnlyCurrent(prev => !prev);
  };

  useEffect(() => {
    // 이슈 발생!
    // 토글된 채로 다른 존으로 이동하면 모든 시간 데이터를 보여준다.

    if (!showOnlyCurrent) {
      if (zoneState === 'default' || zoneState === '') {
        const filteringData = bookingData.filter(
          (data: any) =>
            data.date === currentDate && data.seat.includes(seatInput),
        );

        setFilteredData(filteringData);

        return;
      }

      const filteringData = bookingData.filter(
        (data: any) =>
          data.date === currentDate &&
          data.zone === zoneState &&
          data.seat.includes(seatInput),
      );

      setFilteredData(filteringData);

      return;
    }

    if (zoneState === 'default' || zoneState === '') {
      const filteringData = bookingData.filter(
        (data: any) =>
          data.date === currentDate &&
          data.startTime <= currentHour &&
          data.endTime > currentHour &&
          data.seat.includes(seatInput),
      );

      setFilteredData(filteringData);

      return;
    }

    const filteringData = bookingData.filter(
      (data: any) =>
        data.date === currentDate &&
        data.startTime <= currentHour &&
        data.endTime > currentHour &&
        data.zone === zoneState &&
        data.seat.includes(seatInput),
    );

    setFilteredData(filteringData);
  }, [showOnlyCurrent]);

  useEffect(() => {
    // 이슈 발생!
    // input이 입력된채로 날짜를 변경하면 input value 필터링이 적용되지 않는다
    // date 변경 시 새로운 데이터 받아와야함.

    if (date === '') {
      return;
    }

    if (zoneState === 'default' || zoneState === '') {
      console.log('run');
      // 날짜 선택(변경) 시
      // 변경된 날짜에 대한 API 통신 후 setBookingData에 저장.
      // 해당 날짜의 예약 데이터 전부 불러오고 보여줌.
      // const filtering = dummyData.filter(data => data.date === date);

      // setBookingData(filtering);

      console.log('필터 전', filteredData);

      const filtering = dummyData.filter(
        (data: any) => data.date === date && data.seat.includes(seatInput),
      );

      console.log('필터 후', filtering);

      setBookingData(filtering);

      return;
    }

    // const filtering = dummyData.filter(
    //   data => data.date === date && data.zone === zoneState,
    // );

    // setBookingData(filtering);

    const filtering = dummyData.filter(
      (data: any) =>
        data.date === date &&
        data.zone === zoneState &&
        data.seat.includes(seatInput),
    );

    setBookingData(filtering);

    // 특정 날짜의 예약만 받아오는 것
    // case 1. 백엔드에서 처리해주는 경우 API 통신 res를 그대로 사용
    // case 2. 프론트에서 처리해야하는 경우 filter 후 setBookingData
  }, [date]);

  useEffect(() => {
    // zone 변경 시 해당 날짜의 해당 zone 데이터만 보이도록 설정. API 통신
    if (zoneState === '') {
      return;
    }

    if (zoneState === 'default') {
      const filtering = dummyData.filter(
        data => data.date === date && data.seat.includes(seatInput),
      );

      setFilteredData(filtering);

      return;
    }

    const filtering = dummyData.filter(
      data =>
        data.date === date &&
        data.zone === zoneState &&
        date &&
        data.seat.includes(seatInput),
    );

    setFilteredData(filtering);
  }, [zoneState]);
  // }, [zoneState, date]);

  useEffect(() => {
    setFilteredData(bookingData);
  }, [bookingData]);

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

      <DateInput date={date} changeHandler={dateChangeHandler} />

      <SeatOption
        zoneOption={zoneState}
        zoneChangeHandler={zoneChangeHandler}
        seatInput={seatInput}
        inputHandler={inputChangeHandler}
      />

      <div className={styles.reservationHeader}>
        <h2>예약 정보</h2>

        <button onClick={toogleOnlyCurrentHandler}>
          {showOnlyCurrent ? '모든 시간 보기' : '현재 시간만 보기'}
        </button>
      </div>

      <hr />

      <div>
        {filteredData.length === 0 && <p>예약 정보가 없습니다.</p>}

        {filteredData.length !== 0 && (
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th>시간</th>
                <th>좌석</th>
                <th>예약자</th>
                <th>퇴실</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data: any, index: number) => (
                <tr key={index}>
                  <td>
                    {data.startTime}~{data.endTime}
                  </td>
                  <td>
                    {data.zone}-{data.seat}
                  </td>
                  <td>{data.subscriber}</td>
                  <td>
                    {/* 스타일 구현용 */}
                    {/* <button
                      className={styles.goodbyeBtn}
                      onClick={() => goodbyeHandler(data.id)}
                    >
                      가능
                    </button> */}

                    {data.date === currentDate &&
                      data.startTime <= currentHour &&
                      data.endTime > currentHour && (
                        <button
                          className={styles.goodbyeBtn}
                          onClick={() => goodbyeHandler(data.id)}
                        >
                          가능
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* <BookingState /> */}
    </div>
  );
}

export default AdminBookingRacer;
