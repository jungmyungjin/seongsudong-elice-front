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

export const ReservationContext = createContext<ReservationContextType>({
  reservationInfo: initialReservationInfo,
  updateReservationInfo: () => {},
  reserved: [],
  updateReserved: () => {},
});

export const ReservationProvider: React.FC<ReservationProviderProps> = ({
  children,
}) => {
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo>(
    initialReservationInfo,
  );
  const [reserved, setReserved] = useState<string[]>([]);

  const updateReservationInfo = (info: ReservationInfo) => {
    setReservationInfo(info);
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
