import React, { useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { IconSearchFilterProps } from '../../types/proptypes';

const useStyles = makeStyles({
  searchContainer: {
    position: 'sticky',
    width: '100%',
    top: 0,
    paddingTop: 20,
    backgroundColor: '#fff',
    zIndex: 90,
  },
  searchRoot: {
    marginBottom: 20,
  },
});

const IconSearchFilter: React.FC<IconSearchFilterProps> = (props) => {
  const { onSearch, onReset } = props;
  const { t } = useTranslation();
  const [searchFilter, setSearchFilter] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (searchFilter.length >= 3) {
      onSearch(searchFilter);
    } else {
      onReset();
    }
  }, [onSearch, onReset, searchFilter]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
  };

  return (
    <div className={classes.searchContainer}>
      <TextField
        id="icon-search"
        size="small"
        placeholder={t('search icons')}
        value={searchFilter}
        classes={{ root: classes.searchRoot }}
        onChange={handleSearchInput}
        InputProps={{
          autoComplete: 'off',
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="secondary" />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default IconSearchFilter;
