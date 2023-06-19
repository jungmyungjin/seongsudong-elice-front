export type ServerResponse = {
  [key: string]: {
    seat_type: string;
    available10to14: boolean;
    available14to18: boolean;
    available18to22: boolean;
  };
};

export const enum TimeRange {
  AVAILABLE_10TO14 = '10:00~14:00',
  AVAILABLE_14TO18 = '14:00~18:00',
  AVAILABLE_18TO22 = '18:00~22:00',
}

export function findAvailableSeats(
  serverData: ServerResponse,
  time: string,
): string[] {
  const availableSeatsSet: Set<string> = new Set();
  const timeRanges = time.split(',').map(t => t.trim());

  const isAvailable_10to14 = timeRanges.includes(TimeRange.AVAILABLE_10TO14);
  const isAvailable_14to18 = timeRanges.includes(TimeRange.AVAILABLE_14TO18);
  const isAvailable_18to22 = timeRanges.includes(TimeRange.AVAILABLE_18TO22);

  Object.keys(serverData).forEach(key => {
    const data = serverData[key];

    if (isAvailable_10to14 && isAvailable_14to18 && isAvailable_18to22) {
      if (
        data.available10to14 &&
        data.available14to18 &&
        data.available18to22
      ) {
        availableSeatsSet.add(key);
      }
    } else if (isAvailable_10to14 && isAvailable_14to18) {
      if (data.available10to14 && data.available14to18) {
        availableSeatsSet.add(key);
      }
    } else if (isAvailable_10to14 && isAvailable_18to22) {
      if (data.available10to14 && data.available18to22) {
        availableSeatsSet.add(key);
      }
    } else if (isAvailable_14to18 && isAvailable_18to22) {
      if (data.available14to18 && data.available18to22) {
        availableSeatsSet.add(key);
      }
    } else if (isAvailable_10to14) {
      if (data.available10to14) {
        availableSeatsSet.add(key);
      }
    } else if (isAvailable_14to18) {
      if (data.available14to18) {
        availableSeatsSet.add(key);
      }
    } else if (isAvailable_18to22) {
      if (data.available18to22) {
        availableSeatsSet.add(key);
      }
    }
  });

  return Array.from(availableSeatsSet);
}
