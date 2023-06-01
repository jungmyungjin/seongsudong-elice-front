export interface ImyReservation {
  myReservation: MyReservation[];
  loadMyReservationLoading: boolean;
  loadMyReservationDone: boolean;
  loadMyReservationError: null | string;
  myReservationDetail: MyReservation;
  loadMyReservationDetailLoading: boolean;
  loadMyReservationDetailDone: boolean;
  loadMyReservationDetailError: null | string;
}

export interface MyReservation {
  id: number;
  date: string;
  time: string;
  seat: string;
  visitors: string;
}
