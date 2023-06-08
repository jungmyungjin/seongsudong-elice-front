/**
 * 입력된 시간 데이터가 오늘, 어제, 어제보다 과거 중 어떤 것인지 판단하는 함수
 * @param dataDate YYYY-MM-DD 형태의 날짜 데이터
 * @returns 입력된 날짜가 어제라면 1, 어제보다 과거라면 2, 오늘이라면 0을 반환한다.
 */
function isYesterday(dataDate: string): number {
  const today = new Date();
  const data = new Date(dataDate);

  const diffInTime = today.getTime() - data.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  // 어제
  if (diffInDays === 1) {
    return 1;
  }

  // 어제보다 과거
  if (diffInDays > 1) {
    return 2;
  }

  // 오늘
  return 0;
}

/**
 * 채팅방에서 가장 최근에 입력된 채팅 날짜를 보여주는 함수
 * @param chatDate 가장 최신 채팅의 YYYY-MM-DD 형태의 날짜 데이터
 * @returns 같은 날짜라면 HH:MM 형태의 시간, 어제라면 '어제', 어제보다 과거라면 M월 D일, 년도가 다르면 YYYY.M.D 형태의 문자열을 반환합니다.
 */
export function calculateChatDate(chatDate: string): string {
  const pureChatDate = chatDate.split(' ')[0];
  const pureChatTime = chatDate.split(' ')[1];

  const [chatYear, chatMonth, chatDay] = pureChatDate.split('-').map(Number);

  const year = new Date().getFullYear();

  // 년도가 다르면 "YYYY.MM.DD"로 표시
  if (chatYear !== year) {
    return `${chatYear}.${chatMonth}.${chatDay}`;
  }

  // 같은 년도이면서 어제인 경우
  if (isYesterday(pureChatDate) === 1) {
    return '어제';
  }

  // 같은 년도이면서 어제보다 더 과거인 경우
  if (isYesterday(pureChatDate) === 2) {
    // 오늘이 아니라는 걸 분기 처리를 해야하는데..
    return `${chatMonth}월 ${chatDay}일`;
  }

  // 같은 년도이면서 오늘인 경우
  const splitedTime = pureChatTime.split(':');

  return `${splitedTime[0]}:${splitedTime[1]}`;
}
