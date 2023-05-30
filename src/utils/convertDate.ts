/**
 * @returns {string} "2023년 5월 31일 (수요일) 오전 12:26" 형식으로 현재 시간 내보내줌
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
