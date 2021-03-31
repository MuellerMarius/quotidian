import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
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
    margin: 'auto',
    marginTop: 35,
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

          <Switch>
            <Route exact path="/signup">
              Signup {/* <Signup /> */}
            </Route>
            <Route exact path="/resetpw">
              ResetPW{/* <Resetpw /> */}
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </CardContent>
      </Card>

      <Card variant="outlined" className={classes.footnote}>
        <Typography variant="body2">
          <Switch>
            <Route exact path="/signup">
              {t('user.already member')}{' '}
              <Link to="/">{t('user.click login')}</Link>
            </Route>

            <Route path="/">
              {t('user.new to quotidian')}{' '}
              <Link to="/signup">{t('user.click signup')}</Link>
            </Route>
          </Switch>
        </Typography>
      </Card>
    </>
  );
};

export default WelcomeScreen;
