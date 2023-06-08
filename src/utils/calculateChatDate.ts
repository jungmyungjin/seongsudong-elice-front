export function calculateChatDate(chatDate: string) {
  // 만약, 가장 최신 채팅을 볼 수 있다면, 그 채팅의 시간을 보여줘야함
  // 만약, 그 시간이 어제라면 "어제", 그저께부터는 "M월 DD일"로 표시. 년도가 달라지면 "YY.MM.DD"로 표시
  // 2023-06-08 10:00:00
  console.log(chatDate);

  // 2023-06-08
  const date = chatDate.split(' ')[0];

  return date;
}
