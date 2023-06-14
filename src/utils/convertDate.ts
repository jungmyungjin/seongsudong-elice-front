/**
 * @returns {string} "2023년 5월 31일 (수요일) 오전 12:26" 형식으로 "현재 시간" 내보내줌
 */
export function convertDate(now?: Date): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dayOfWeek = today.toLocaleString('ko-KR', { weekday: 'long' });
  let hour = today.getHours();
  const minute = today.getMinutes();

  const amPm = hour < 12 ? '오전' : '오후';
  hour = hour % 12 || 12;

  const formattedHour = hour < 10 ? `0${hour}` : hour;
  const formattedMinute = minute < 10 ? `0${minute}` : minute;

  const formattedDate = `${year}년 ${month}월 ${day}일 (${dayOfWeek}) ${amPm} ${formattedHour}:${formattedMinute}`;

  return formattedDate;
}

/**
 *
 * @param dateTimeString  string으로 들어오는 날짜
 * @returns 2023년 6월 14일 (수요일) 오후 05:00'
 */
export function getCustomDateString(dateTimeString: string) {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${year}년 ${month}월 ${day}일 (${dayOfWeek}요일)`;
  const formattedHours = hours > 12 ? `오후 ${hours - 12}` : `오전 ${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return `${formattedDate} ${formattedTime}`;
}

/**
 *
 * @param dateTimeString  string으로 들어오는 날짜
 * @returns 요일까지만 출력됨요 > 월, 일, 요일에 따라서 요일이 다르면 한 번만 출력하게 하기 위해서 만든 함수
 */
export function getPrevDateString(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`;
}

/**
 *
 * @returns {string} "오전 1:11"
 */
export function stringToTime(dateTimeString: string) {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours > 12 ? `오후 ${hours - 12}` : `오전 ${hours}`;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return formattedTime;
}
