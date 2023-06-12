/**
 * YYYY-MM-DD 형식의 오늘 날짜 데이터를 얻는 함수
 * @returns YYYY-MM-DD 형식의 오늘 날짜 데이터
 */
export function getCurrentDate(): string {
  const today = new Date();
  const day = today.getDay();
  const hours = today.getHours();

  const isFridayAfterSixPm = day === 5 && hours >= 18;
  const isSaturday = day === 6;

  if (day === 0) {
    // 일요일인 경우
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() + (1 - day)); // 해당 주 월요일로 이동

    const year = currentMonday.getFullYear();
    const month = (currentMonday.getMonth() + 1).toString().padStart(2, '0');
    const date = currentMonday.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${date}`;
  } else if (isSaturday || isFridayAfterSixPm) {
    // 토요일이거나 금요일 오후 6시 이후인 경우
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + (8 - day)); // 다음 주 월요일로 이동

    const year = nextMonday.getFullYear();
    const month = (nextMonday.getMonth() + 1).toString().padStart(2, '0');
    const date = nextMonday.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${date}`;
  } else {
    // 월, 화, 수, 목, 금요일 오후 6시 이전인 경우
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${date}`;
  }
}

/**
 * 일, 월, 화, 수, 목, 금요일 오후 6시 이전의 경우 일주일 날짜 데이터를 배열로 얻는 함수
 * @returns [YYYY-MM-DD(월), YYYY-MM-DD(화), YYYY-MM-DD(수) ...]
 */
export function getWeekdayDates(): string[] {
  const today = new Date();
  const day = today.getDay();
  const hours = today.getHours();

  const isFridayAfterSixPm = day === 5 && hours >= 18;
  const isSaturday = day === 6;

  // 금요일 오후 6시 이후 또는 토요일(6)인 경우
  if (isFridayAfterSixPm || isSaturday) {
    const nextMonday = new Date(today);
    nextMonday.setDate(
      today.getDate() + (8 - day) + (isFridayAfterSixPm ? 3 : 2),
    ); // 다음 주 월요일로 이동

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
 * YYYY 형식의 현재 년도 데이터를 얻는 함수
 * @returns YYYY 형식의 현재 년도 데이터
 */
export function getCurrentYear(): string {
  const today = new Date();
  return today.getFullYear().toString();
}

/**
 * props로 입력받은 날짜와 오늘을 비교해 같은 날인지 확인하는 함수
 * @param string 형식의 비교할 날짜 데이터
 * @returns boolean
 */
export function isSameDay(date: string): boolean {
  const currentDate = new Date();
  const selectedDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  return selectedDate <= currentDate;
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
 * props로 입력받은 시간와 현재 시간을 비교해 해당 시간이 지났는지 확인하는 함수
 */
