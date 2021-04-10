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
    color: '#676973',
    fontWeight: 600,
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
              exact
              to="/"
              className={classes.link}
              activeClassName={classes.activeLink}
            >
              {t('menu.entries')}
            </NavLink>
            <NavLink
              exact
              to="/statistics"
              className={classes.link}
              activeClassName={classes.activeLink}
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
