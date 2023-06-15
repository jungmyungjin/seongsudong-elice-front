import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { CustomLinkInterface } from 'types/customLink';
import Icon from './Icon';
import Direction from './Direction';
import styles from './customLink.module.scss';
import darkStyles from './customLinkDark.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

function CustomLink(props: CustomLinkInterface) {
  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  if (props.icon === 'notice') {
    return (
      <Link
        to={props.to}
        state={{
          tab: '공지',
        }}
        className={selectedStyles.link}
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
    <Link to={props.to} className={selectedStyles.link}>
      <div className={styles.icon_title_div}>
        <Icon description={props.icon} />

        <span>{props.title}</span>
      </div>

      <Direction right={props.right} />
    </Link>
  );
}

export default CustomLink;
