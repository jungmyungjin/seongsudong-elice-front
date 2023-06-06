interface SeatData {
  seat_number: string;
  available_10to14: boolean;
  available_14to18: boolean;
  available_18to22: boolean;
}

export interface ServerResponse {
  status: string;
  seats: SeatData[];
}

export default function findAvailableSeats(serverData: ServerResponse): {
  available_10to14: string[];
  available_14to18: string[];
  available_18to22: string[];
  available_10to14_14to18: string[];
  available_10to14_18to22: string[];
  available_14to18_18to22: string[];
  available_all: string[];
} {
  const available_10to14: string[] = [];
  const available_14to18: string[] = [];
  const available_18to22: string[] = [];
  const available_10to14_14to18: string[] = [];
  const available_10to14_18to22: string[] = [];
  const available_14to18_18to22: string[] = [];
  const available_all: string[] = [];

  serverData.seats.forEach(seat => {
    if (seat.available_10to14) {
      available_10to14.push(seat.seat_number);
      if (seat.available_14to18) {
        available_10to14_14to18.push(seat.seat_number);
      }
      if (seat.available_18to22) {
        available_10to14_18to22.push(seat.seat_number);
      }
    }
    if (seat.available_14to18) {
      available_14to18.push(seat.seat_number);
      if (seat.available_18to22) {
        available_14to18_18to22.push(seat.seat_number);
      }
    }
    if (seat.available_18to22) {
      available_18to22.push(seat.seat_number);
    }
    if (
      seat.available_10to14 &&
      seat.available_14to18 &&
      seat.available_18to22
    ) {
      available_all.push(seat.seat_number);
    }
  });

  return {
    available_10to14,
    available_14to18,
    available_18to22,
    available_10to14_14to18,
    available_10to14_18to22,
    available_14to18_18to22,
    available_all,
  };
}

export function getAvailableSeatsByTimes(
  availableSeats: {
    available_10to14: string[];
    available_14to18: string[];
    available_18to22: string[];
    available_10to14_14to18: string[];
    available_10to14_18to22: string[];
    available_14to18_18to22: string[];
    available_all: string[];
  },
  selectedTimes: string,
): string[] {
  if (selectedTimes === '10:00~14:00') {
    return availableSeats.available_10to14;
  }
  if (selectedTimes === '14:00~18:00') {
    return availableSeats.available_14to18;
  }
  if (selectedTimes === '18:00~22:00') {
    return availableSeats.available_18to22;
  }
  if (selectedTimes === '10:00~14:00, 14:00~18:00') {
    return availableSeats.available_10to14_14to18;
  }
  if (selectedTimes === '10:00~14:00, 18:00~22:00') {
    return availableSeats.available_10to14_18to22;
  }
  if (selectedTimes === '14:00~18:00, 18:00~22:00') {
    return availableSeats.available_14to18_18to22;
  }
  if (selectedTimes === '10:00~14:00, 14:00~18:00, 18:00~22:00') {
    return availableSeats.available_all;
  }
  return [];
}
