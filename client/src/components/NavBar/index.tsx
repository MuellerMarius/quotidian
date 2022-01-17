import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import AvatarMenu from '../AvatarMenu';
import LanguageSelector from '../LanguageSelector';
import logo_sm from './img/logo_sm.png';

const useStyles = makeStyles({
  nav: {
    display: 'inline-block',
  },
  logo: {
    height: 115,
  },
  link: {
    paddingRight: 35,
    fontWeight: 500,
    textDecoration: 'none',
    color: '#898C9F',
    '&:hover': {
      color: '#39406D',
    },
  },
  activeLink: {
    paddingRight: 35,
    color: '#676973',
    fontWeight: 600,
    '&:hover': {
      color: '#39406D',
    },
  },
});

const NavBar = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <header>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <img src={logo_sm} alt="Quotidian Logo" className={classes.logo} />
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h5" component="h5">
            quotidian
          </Typography>
        </Grid>
        <Grid item xs={3} sm={4} md={5} lg={6}>
          <nav className={classes.nav}>
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                isActive ? classes.activeLink : classes.link
              }
            >
              {t('menu.entries')}
            </NavLink>
            <NavLink
              end
              to="/statistics"
              className={({ isActive }) =>
                isActive ? classes.activeLink : classes.link
              }
            >
              {t('menu.statistics')}
            </NavLink>
          </nav>
        </Grid>
        <Grid item xs={2}>
          <LanguageSelector />
        </Grid>
        <Grid item>
          <AvatarMenu />
        </Grid>
      </Grid>
    </header>
  );
};

export default React.memo(NavBar);
