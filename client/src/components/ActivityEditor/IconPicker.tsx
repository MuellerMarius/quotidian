import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  makeStyles,
  GridList,
  GridListTile,
  Icon,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import IconSearchFilter from './IconSearchFilter';
import materialIcons from '../../util/icons';
import { IconPickerProps } from '../../types/proptypes';

const useStyles = makeStyles({
  container: {
    padding: '0 20px',
    minHeight: 150,
    maxHeight: 350,
    maxWidth: 350,
    overflowY: 'auto',
  },
  loadingSpinner: {
    display: 'block',
    margin: '10px auto',
  },
  tile: {
    textAlign: 'center',
    height: '2.3rem',
  },
});

const IconPicker: React.FC<IconPickerProps> = (props) => {
  const { onChange } = props;
  const iconsOnPage = 75;
  const [icons, setIcons] = useState(materialIcons.slice(0, iconsOnPage));
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [page, setPage] = useState(1);
  const loading = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  useEffect(() => {
    const options = {
      root: container.current,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loading.current) {
      observer.observe(loading.current);
    }
  }, []);

  useEffect(() => {
    // lazy loading
    if (page * iconsOnPage >= materialIcons.length) {
      setIcons(materialIcons);
    } else {
      setIcons((i) =>
        i.concat(materialIcons.slice(i.length, page * iconsOnPage))
      );
    }
  }, [page]);

  const handleObserver = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((p) => p + 1);
    }
  };

  const setSearchFilter = useCallback((filter: string) => {
    setIsSearchActive(true);
    setIcons(materialIcons.filter((name) => name.includes(filter)));
  }, []);

  const resetSearchFilter = useCallback(() => {
    if (isSearchActive) {
      setPage(1);
      setIcons(materialIcons.slice(0, iconsOnPage));
      setIsSearchActive(false);
    }
  }, [isSearchActive]);

  const isLoadingSpinnerVisible = () =>
    page * iconsOnPage <= materialIcons.length && !isSearchActive;

  return (
    <div className={classes.container} ref={container}>
      <IconSearchFilter
        onSearch={setSearchFilter}
        onReset={resetSearchFilter}
      />

      <GridList cols={6} cellHeight="auto" spacing={4}>
        {icons.map((icon) => (
          <GridListTile key={icon} cols={1} classes={{ tile: classes.tile }}>
            <IconButton onClick={() => onChange(icon)} size="small">
              <Icon>{icon}</Icon>
            </IconButton>
          </GridListTile>
        ))}
      </GridList>

      <CircularProgress
        style={{ display: isLoadingSpinnerVisible() ? 'block' : 'none' }}
        classes={{ root: classes.loadingSpinner }}
        ref={loading}
        size={20}
      />
    </div>
  );
};

export default IconPicker;
