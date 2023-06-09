import React from 'react';

import styles from './unvalid.module.scss';

function Unvalid() {
  return (
    <div className={styles.unvalid}>
      <div className={styles.content}>
        <p>경로가 올바르지 않습니다.</p>

        <img
          alt='잘못된 만남'
          src={`${process.env.PUBLIC_URL}/images/thinkPlease.png`}
        />
      </div>
    </div>
  );
}

export default Unvalid;
