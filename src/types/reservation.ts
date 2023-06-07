export interface ReservationState {
  reservation_date: string;
  time: string;
  seat_number: string;
  seat_type: string;
  visitors: string;
}

export interface SelectDateProps {
  label: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCheckbox: string;
}

export interface SingleSelectProps {
  typeList: string[];
  onSelect?: (value: string) => void;
}

export interface MultiSelectorProps {
  typeList: string[];
}

export interface SeatLayoutProps {
  className?: string;
  clickEvent?: (value: string) => void;
}
