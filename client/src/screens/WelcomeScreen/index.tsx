import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import logo_lg from './img/logo_lg.png';

const useStyles = makeStyles({
  cardRoot: {
    maxWidth: 350,
    margin: 'auto',
    marginTop: 220,
    overflow: 'unset',
  },
  footnote: {
    maxWidth: 350,
    margin: '35px auto',
    padding: 15,
  },
  image: {
    objectFit: 'contain',
    position: 'relative',
    top: -200,
    marginBottom: -200,
  },
  divider: {
    margin: '10px 30px',
    border: '1px solid #EEE',
  },
});

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Card className={classes.cardRoot} raised>
        <CardMedia
          component="img"
          alt="Quotidian Logo"
          title="Quotidian Logo"
          height="290"
          image={logo_lg}
          className={classes.image}
        />
        <CardContent>
          <Typography variant="h5" component="h5" gutterBottom>
            quotidian
          </Typography>
          <Typography variant="body2" component="p" color="secondary">
            {t('description')}
          </Typography>
          <hr className={classes.divider} />

          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetpw" element={<ResetPassword />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </CardContent>
      </Card>

      <Card variant="outlined" className={classes.footnote}>
        <Typography variant="body2">
          <Routes>
            <Route
              path="/signup"
              element={
                <span>
                  {t('user.already member')}{' '}
                  <Link to="/">{t('user.click login')}</Link>
                </span>
              }
            />

             <Route path="/resetpw" element={
              <span>
                {t('user.already member')}{' '}
                <Link to="/">{t('user.click login')}</Link>
              </span>} />

            <Route path="/" element={
              <span>
                {t('user.new to quotidian')}{' '}
                <Link to="/signup">{t('user.click signup')}</Link>
              </span>} />
          </Routes>
        </Typography>
      </Card>
    </>
  );
};

export default WelcomeScreen;
