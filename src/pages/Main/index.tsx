import React from 'react';
import styles from './main.module.scss';
import Input from 'components/common/Input';
import { utils } from 'utils/utils';

export default function Main() {
  return (
    <>
      <div className={styles.hello}>
        안녕 난 엘리스 레이서야
        <Input />
      </div>
    </>
  );
}
