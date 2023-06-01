export interface ImyReservation {
  myReservation: MyReservation[];
  loadMyReservationLoading: boolean;
  loadMyReservationDone: boolean;
  loadMyReservationError: null | string;
}

export interface MyReservation {
  id: number;
  date: string;
  time: string;
  seat: string;
  visitors: string;
}
