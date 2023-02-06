import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState('');
  };

  const { search } = state;

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button className={styles.searchForm_button} type="submit">
          <span className={styles.searchForm_button_label}>Search</span>
        </button>
        <input
          className={styles.searchForm_input}
          value={search}
          onChange={handleChange}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
