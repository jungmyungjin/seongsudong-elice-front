/**
 * 'YYYY' 형식의 현재 년도 데이터를 얻는 함수
 * @returns 'YYYY' 형식의 현재 년도 데이터
 */
export function getCurrentYear(): string {
  const today = new Date();
  return today.getFullYear().toString();
}

/**
 * 'YYYY-MM-DD' 형식의 오늘 날짜 데이터를 얻는 함수
 * @returns 'YYYY-MM-DD' 형식의 오늘 날짜 데이터
 */
export function getCurrentDate(): string {
  const today = new Date();
  const day = today.getDay();
  const hours = today.getHours();

  const isFridayAfterTenPm = day === 5 && hours >= 22;
  const isSaturday = day === 6;

  if (day === 0) {
    // 일요일인 경우
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() + (1 - day)); // 해당 주 월요일로 이동

    const year = currentMonday.getFullYear();
    const month = (currentMonday.getMonth() + 1).toString().padStart(2, '0');
    const date = currentMonday.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${date}`;
  } else if (isSaturday || isFridayAfterTenPm) {
    // 토요일이거나 금요일 오후 10시 이후인 경우
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + (8 - day)); // 다음 주 월요일로 이동

    const year = nextMonday.getFullYear();
    const month = (nextMonday.getMonth() + 1).toString().padStart(2, '0');
    const date = nextMonday.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${date}`;
  } else {
    // 월, 화, 수, 목, 금요일 오후 10시 이전인 경우
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${date}`;
  }
}

/**
 * 일, 월, 화, 수, 목, 금요일 오후 10시 이전의 경우 일주일 날짜 데이터를 문자열의 배열로 얻는 함수
 * @returns ['YYYY-MM-DD(월)', 'YYYY-MM-DD(화)', 'YYYY-MM-DD(수)' ...]
 */
export function getWeekdayDates(): string[] {
  const today = new Date();
  const day = today.getDay();
  const hours = today.getHours();

  const isFridayAfterTenPm = day === 5 && hours >= 22;
  const isSaturday = day === 6;

  // 금요일 오후 10시 이후 또는 토요일(6)인 경우
  if (isFridayAfterTenPm || isSaturday) {
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + 2 + (isFridayAfterTenPm ? 1 : 0)); // 다음 주 월요일로 이동

    const weekDates = Array.from({ length: 5 }, (_, index) => {
      const date = new Date(nextMonday);
      date.setDate(nextMonday.getDate() + index);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dayOfWeek = ['월', '화', '수', '목', '금'][index];
      return `${year}-${month}-${day}(${dayOfWeek})`;
    });

    return weekDates;
  } else if (day === 0) {
    // 일요일(0)인 경우
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() + 1); // 해당 주 월요일로 이동

    const weekDates = Array.from({ length: 5 }, (_, index) => {
      const date = new Date(currentMonday);
      date.setDate(currentMonday.getDate() + index);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dayOfWeek = ['월', '화', '수', '목', '금'][index];
      return `${year}-${month}-${day}(${dayOfWeek})`;
    });

    return weekDates;
  } else {
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() + (1 - day)); // 해당 주 월요일로 이동

    const weekDates = Array.from({ length: 5 }, (_, index) => {
      const date = new Date(currentMonday);
      date.setDate(currentMonday.getDate() + index);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dayOfWeek = ['월', '화', '수', '목', '금'][index];
      return `${year}-${month}-${day}(${dayOfWeek})`;
    });

    return weekDates;
  }
}

/**
 * 오늘이 월, 화, 수, 목, 금요일 오후 10시 이전인지 확인하는 함수
 * @returns boolean
 */
export function isWeekdayAndFriBeforeTenPm(): boolean {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentHour = currentDate.getHours();

  const isFridayAfterTenPm = currentDay === 5 && currentHour >= 22;
  const isSaturday = currentDay === 6;
  const isSunday = currentDay === 0;

  // 현재 요일이 일요일(0), 토요일(6), 또는 금요일(5)이고 현재 시간이 오후 22시 이후인지 확인
  if (isFridayAfterTenPm || isSaturday || isSunday) {
    return false;
  }
  return true;
}

/**
 * props로 입력받은 날짜와 오늘을 비교해 같은 날인지 확인하는 함수
 * @param string 형식의 비교할 날짜 데이터
 * @returns boolean
 */
export function isSameDay(date: string): boolean {
  const currentDate = new Date();
  const selectedDate = new Date(date);

  return (
    currentDate.getFullYear() === selectedDate.getFullYear() &&
    currentDate.getMonth() === selectedDate.getMonth() &&
    currentDate.getDate() === selectedDate.getDate()
  );
}

/**
 * props로 입력받은 날짜가 당일인지 확인 후
 * 입력받은 시간와 현재 시간을 비교해 해당 시간이 지났는지 확인하는 함수
 * @param time : number 형식의 현재 시간과 비교할 시간 데이터 (ex. 14)
 * @param date : string 형식의 비교할 날짜 데이터
 * @param callbackFnc : 해당 시간이 지났을 경우 실행할 콜백 함수
 * @returns void
 */
export function isPassedTime(
  time: number,
  date: string,
  callbackFnc: () => void,
): void {
  const currentTime = new Date().getHours();

  // 선택한 당일인 경우 선택한 시간과 현재 시간 비교
  if (isSameDay(date)) {
    if (time <= currentTime) {
      callbackFnc();
      return;
    }
  }
}

/**
 * 현재 시간이 오후 10시 이전이라면 당일 날짜 반환,
 * 오후 10시 이후라면 다음날 날짜 반환하는 함수
 * @returns 'YYYY-MM-DD' 형식의 날짜 데이터
 */
export function afterTenPmGetNextDate(): string {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  // 현재 시간이 오후 10시 이후인지 확인
  if (currentHour >= 22) {
    // 다음날의 날짜 계산
    const nextDate = new Date();
    nextDate.setDate(currentDate.getDate() + 1);

    // 날짜를 '2023-06-16' 형식으로 포맷팅
    const formattedDate = nextDate.toISOString().split('T')[0];
    return formattedDate;
  }

  // 현재 시간이 오후 10시 이전이라면 현재 날짜 반환
  return currentDate.toISOString().split('T')[0];
}

/**
 * 현재 시간 기준 가장 가까운 예약 가능 시간을 반환하는 함수
 * @returns "HH:00~HH:00" 형식의 string 데이터
 */
export function getNearestAvailableTime(): string {
  const currentHour = new Date().getHours();

  if (currentHour >= 14 && currentHour < 18) {
    return '14:00~18:00';
  } else if (currentHour >= 18 && currentHour < 22) {
    return '18:00~22:00';
  } else {
    return '10:00~14:00';
  }
}

/**
 * 현재 시간이 오후 10시 이전인지 확인하는 함수
 * @return boolean
 */
export function checkBeforeTenPm(): boolean {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  // 현재 시간이 오후 10시 이후인지 확인
  if (currentHour >= 22) {
    return false;
  }

  return true;
}
