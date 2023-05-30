import { useRef } from 'react';
import React, { useState } from 'react';
import styles from './fullmodal.module.scss';
import { FullModalProps } from 'types/modal';

function FullModal({ children, title, modalHandler }: FullModalProps) {
  const closeAction = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.header}>
            <label className={styles.headerTitle}>{title}</label>
          </div>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default FullModal;
