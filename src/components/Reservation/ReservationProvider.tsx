import React, { createContext, useState } from 'react';

interface ReservationProviderProps {
  children: React.ReactNode;
}

export interface ReservationInfo {
  date: string;
  startTime: string;
  endTime: string;
  seatType: string;
  seat: string;
  visitors: string;
  subscriber: string;
}

interface ReservationContextType {
  reservationInfo: ReservationInfo;
  updateReservationInfo: (info: ReservationInfo) => void;
  reserved: string[];
  updateReserved: (seat: string) => void;
}

const initialReservationInfo: ReservationInfo = {
  date: '',
  startTime: '',
  endTime: '',
  seatType: '',
  seat: '',
  visitors: '',
  subscriber: '',
};

const getWeeklyMondayDate = () => {
  const today = new Date();
  const day = today.getDay();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - day + 1);

  const year = startDate.getFullYear();
  const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
  const date = startDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${date}`;
  return formattedDate;
};

export const ReservationContext = createContext<ReservationContextType>({
  reservationInfo: initialReservationInfo,
  updateReservationInfo: () => {},
  reserved: [],
  updateReserved: () => {},
});

export const ReservationProvider: React.FC<ReservationProviderProps> = ({
  children,
}) => {
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo>({
    ...initialReservationInfo,
    date: getWeeklyMondayDate(),
    startTime: '10',
    seatType: '개인석',
  });
  const [reserved, setReserved] = useState<string[]>([]);

  const updateReservationInfo = (info: Partial<ReservationInfo>) => {
    setReservationInfo(prevInfo => ({
      ...prevInfo,
      ...info,
    }));
  };

  const updateReserved = (seat: string) => {
    setReserved(prevReserved => [...prevReserved, seat]);
  };

  return (
    <ReservationContext.Provider
      value={{
        reservationInfo,
        updateReservationInfo,
        reserved,
        updateReserved,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
