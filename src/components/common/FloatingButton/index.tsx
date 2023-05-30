import React from 'react';
import styles from './floatingButton.module.scss';

function FloatingButton() {
  return (
    <div className={styles.floatingButtonContainer}>
      <button className={styles.floatingButton}>
        <div className={styles.floatingButtonText}>문의하기</div>
        <div className={styles.rabbitIcon}>
          <img src='images/rabbit.png' alt='rabbit-icon' />
        </div>
      </button>
    </div>
  );
}

export default FloatingButton;
