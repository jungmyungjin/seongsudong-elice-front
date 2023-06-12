export interface ImyReservation {
  pastReservations: MyReservation[];
  upcomingReservations: MyReservation[];
  loadMyReservationLoading: boolean;
  loadMyReservationDone: boolean;
  loadMyReservationError: null | string;
  myReservationDetail: MyReservation;
  successMessage: string;
  cancelMyReservationLoading: boolean;
  cancelMyReservationDone: boolean;
  cancelMyReservationError: null | string;
  sendEmailLoading: boolean;
  sendEmailDone: boolean;
  sendEmailError: null | string;
}

export interface MyReservation {
  reservation_id: string;
  member_generation: string;
  member_name: string;
  member_email: string;
  reservation_date: string;
  start_time: string;
  end_time: string;
  num_of_guests: number;
  visitors: string;
  seat_number: string;
  seat_type: string;
  status: string;
  created_at: string;
}
