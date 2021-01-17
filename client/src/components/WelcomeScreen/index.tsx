import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import logo_lg from './img/logo_lg.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: 'auto',
    marginTop: 220,
    overflow: 'unset',
  },
  image: {
    objectFit: 'contain',
    position: 'relative',
    top: -190,
    marginBottom: -190,
  },
  divider: {
    margin: 30,
    border: '1px solid #EEE',
  },
  button: {
    marginTop: 15,
  },
});

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();

  return (
    <Card className={classes.root} raised>
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

        <Typography variant="subtitle2" component="p" color="secondary">
          {t('description')}
        </Typography>

        <hr className={classes.divider} />

        <Button color="primary" onClick={() => loginWithRedirect()} fullWidth>
          {t('login')}
        </Button>

        <Button
          color="primary"
          onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
          className={classes.button}
          fullWidth
        >
          {t('signup')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WelcomeScreen;
