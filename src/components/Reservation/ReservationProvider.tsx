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
  subscriber: string;
}

interface ReservationContextType {
  reservationInfo: ReservationInfo;
  updateReservationInfo: (info: ReservationInfo) => void;
}

const initialReservationInfo: ReservationInfo = {
  date: '',
  startTime: '',
  endTime: '',
  seatType: '',
  seat: '',
  subscriber: '',
};

export const ReservationContext = createContext<ReservationContextType>({
  reservationInfo: initialReservationInfo,
  updateReservationInfo: () => {},
});
export const ReservationProvider: React.FC<ReservationProviderProps> = ({
  children,
}) => {
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo>(
    initialReservationInfo,
  );

  const updateReservationInfo = (info: ReservationInfo) => {
    setReservationInfo(info);
  };

  return (
    <ReservationContext.Provider
      value={{ reservationInfo, updateReservationInfo }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
