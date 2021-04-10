import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FormValidation from '../../util/FormValidation';
import { FormValidationConfig } from '../../types/types';
import { useAuth } from '../../context/AuthContext';

type StateType = {
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  valError: string[];
};

const initialState = {
  email: '',
  password: '',
  showPassword: false,
  isLoading: false,
  valError: [''],
};

const validationConfig: FormValidationConfig[] = [
  {
    inputName: 'email',
    rules: [{ type: 'email' }],
  },
  {
    inputName: 'password',
    rules: [{ type: 'password' }],
  },
];

const useStyles = makeStyles({
  button: {
    marginTop: 15,
  },
  inputFieldRoot: {
    marginTop: 15,
  },
  linkRight: {
    padding: 5,
    float: 'right',
  },
});

const Login = () => {
  const formValidator = new FormValidation(validationConfig);
  const [state, setState] = useState(initialState);
  const { email, password, showPassword, isLoading, valError } = state;
  const { login } = useAuth();
  const { t } = useTranslation();
  const classes = useStyles();

  const updateState = (updated: Partial<StateType>) => {
    setState((old) => ({ ...old, ...updated }));
  };

  const submitForm = () => {
    const { areInputsValid, validationErrors } = formValidator.validate({
      email,
      password,
    });
    updateState({ isLoading: true, valError: validationErrors });

    if (areInputsValid) {
      login(email, password).catch(() =>
        updateState({ isLoading: false, valError: ['wrong-pw'] })
      );
    } else {
      updateState({ isLoading: false });
    }
  };

  return (
    <form>
      <TextField
        id="email"
        label={t('user.email')}
        value={email}
        autoComplete="email"
        classes={{ root: classes.inputFieldRoot }}
        variant="outlined"
        fullWidth
        error={valError.includes('email')}
        helperText={valError.includes('email') ? t('user.invalid email') : null}
        onChange={(e) => updateState({ email: e.target.value })}
      />
      <TextField
        id="password"
        type={showPassword ? 'text' : 'password'}
        label={t('user.password')}
        value={password}
        autoComplete="current-password"
        classes={{ root: classes.inputFieldRoot }}
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => updateState({ showPassword: !showPassword })}
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                  e.preventDefault()
                }
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={valError.includes('password') || valError.includes('wrong-pw')}
        helperText={
          valError.includes('password')
            ? t('user.invalid pw')
            : valError.includes('wrong-pw')
            ? t('user.wrong pw')
            : null
        }
        onChange={(e) => updateState({ password: e.target.value })}
      />
      <Link to="/resetpw" className={classes.linkRight}>
        <Typography variant="caption">{t('user.forgotpw')}</Typography>
      </Link>
      <Button
        color="primary"
        variant="contained"
        onClick={() => submitForm()}
        className={classes.button}
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? <CircularProgress size={22} /> : t('login')}
      </Button>
    </form>
  );
};

export default Login;
