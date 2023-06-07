export type ServerResponse = {
  [key: string]: {
    available_10to14: boolean;
    available_14to18: boolean;
    available_18to22: boolean;
  };
};

export function findAvailableSeats(
  serverData: ServerResponse,
  time: string,
): string[] {
  const availableSeatsSet: Set<string> = new Set();
  const timeRanges = time.split(',').map(t => t.trim());

  const isAvailable_10to14 = timeRanges.includes('10:00~14:00');
  const isAvailable_14to18 = timeRanges.includes('14:00~18:00');
  const isAvailable_18to22 = timeRanges.includes('18:00~22:00');

  Object.keys(serverData).forEach(key => {
    const data = serverData[key];

    if (isAvailable_10to14 && isAvailable_14to18 && isAvailable_18to22) {
      if (
        data.available_10to14 &&
        data.available_14to18 &&
        data.available_18to22
      ) {
        availableSeatsSet.add(key);
      }
    } else if (isAvailable_10to14 && isAvailable_14to18) {
      if (data.available_10to14 && data.available_14to18) {
        availableSeatsSet.add(key);
      }
    } else if (isAvailable_10to14 && isAvailable_18to22) {
      if (data.available_10to14 && data.available_18to22) {
        availableSeatsSet.add(key);
      }
    } else if (isAvailable_14to18 && isAvailable_18to22) {
      if (data.available_14to18 && data.available_18to22) {
        availableSeatsSet.add(key);
      }
    } else if (isAvailable_10to14) {
      if (data.available_10to14) {
        availableSeatsSet.add(key);
      }
    } else if (isAvailable_14to18) {
      if (data.available_14to18) {
        availableSeatsSet.add(key);
      }
    } else if (isAvailable_18to22) {
      if (data.available_18to22) {
        availableSeatsSet.add(key);
      }
    }
  });

  return Array.from(availableSeatsSet);
}
