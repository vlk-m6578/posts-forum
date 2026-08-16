import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import styles from './SearchBar.module.css'
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  value: string;
}

export const SearchBar = ({ onSearch, value }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(value);
  const debounced = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debounced !== value || debounced === '') {
      onSearch(debounced);
    }
  }, [debounced]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  const handleButtonClick = () => {
    setSearchQuery('');
  }

  return (
    <div className={styles.search_bar}>
      <input type='text' value={searchQuery} onChange={handleChangeInput} placeholder='Search' />
      <div className={styles.search_bar__btn}>
        <Button variant='search' onButtonClick={handleButtonClick} />
      </div>
    </div>
  )
}