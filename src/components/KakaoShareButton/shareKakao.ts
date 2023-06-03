const { Kakao } = window;

interface buttonContents {
  date: string;
  time: string;
  seat: string;
  visitors: string;
}

export const shareKakao = (buttonContents: buttonContents) => {
  if (Kakao.isInitialized()) {
    Kakao.Share.sendCustom({
      templateId: 94547,
      templateArgs: {
        date: `${buttonContents.date}`,
        time: `${buttonContents.time}`,
        seat: `${buttonContents.seat}`,
        visitors: `${buttonContents.visitors}`,
      },
    });
  }
};
