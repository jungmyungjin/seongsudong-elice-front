import React from 'react';
import styles from './boards.module.scss';
import { useNavigate } from 'react-router-dom';
import ChevronRight from 'assets/ChevronRight.svg';

interface BoardsProps {
  boardName: string;
  route: string;
  icon: string;
}

const CategoryBtn = ({
  name,
  icon,
}: {
  name: string;
  icon: string;
}): JSX.Element => {
  return (
    <div className={styles.categoryLayout}>
      <div className={styles.title}>
        <img src={icon} alt='icon megaphone' />
        {name}
      </div>
      <img src={ChevronRight} alt='icon right arrow' />
    </div>
  );
};

const Boards = (props: BoardsProps): React.ReactElement => {
  const { route, boardName, icon } = props;
  let navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <div>
      <button
        className={styles.boards}
        onClick={() => {
          handleClick(route);
        }}
      >
        <CategoryBtn icon={icon} name={boardName} />
      </button>
    </div>
  );
};

export default Boards;
