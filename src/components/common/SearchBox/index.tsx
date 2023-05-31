import React from 'react';
import { ReactComponent as Search } from 'assets/Search.svg';
import styles from './searchBox.module.scss';

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.inputDiv}>
      <Search className={styles.searchGlass} />
      <input
        className={styles.searchTitle}
        type="text"
        placeholder="제목으로 검색해주세요."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
