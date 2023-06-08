import React from 'react';

import styles from './zoneOption.module.scss';

interface ZoneOptionInterface {
  zoneOption: string;
  changeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function ZoneOption(props: ZoneOptionInterface) {
  const zoneArr = [
    {
      zoneName: '-공간 선택-',
      zoneValue: '',
    },
    {
      zoneName: '개인석',
      zoneValue: '개인석',
    },
    {
      zoneName: '팀플석',
      zoneValue: '팀플석',
    },
    {
      zoneName: '수료 기수석',
      zoneValue: '수료 기수석',
    },
    {
      zoneName: '미팅룸',
      zoneValue: '미팅룸',
    },
  ];

  return (
    <select
      value={props.zoneOption}
      onChange={props.changeHandler}
      className={styles.select}
    >
      {zoneArr.map((data, index) => (
        <option value={data.zoneValue} key={index}>
          {data.zoneName}
        </option>
      ))}
    </select>
  );
}

export default ZoneOption;
