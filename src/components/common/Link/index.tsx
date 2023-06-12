import React from 'react';
import { Link } from 'react-router-dom';

import { CustomLinkInterface } from 'types/customLink';
import Icon from './Icon';
import Direction from './Direction';
import styles from './customLink.module.scss';

function CustomLink(props: CustomLinkInterface) {
  if (props.icon === 'notice') {
    return (
      <Link
        to={props.to}
        state={{
          tab: '공지',
        }}
        className={styles.link}
      >
        <div className={styles.icon_title_div}>
          <Icon description={props.icon} />

          <span>{props.title}</span>
        </div>

        <Direction right={props.right} />
      </Link>
    );
  }

  return (
    <Link to={props.to} className={styles.link}>
      <div className={styles.icon_title_div}>
        <Icon description={props.icon} />

        <span>{props.title}</span>
      </div>

      <Direction right={props.right} />
    </Link>
  );
}

export default CustomLink;
