import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import FormValidation from '../../util/FormValidation';
import { FormValidationConfig } from '../../types/types';
import { useAuth } from '../../context/AuthContext';

type StateType = {
  name: string;
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  valError: string[];
};

const initialState = {
  name: '',
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
    inputName: 'name',
    rules: [{ type: 'nonEmptyField' }],
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
  marginTop: {
    marginTop: 8,
  },
});

const Signup = () => {
  const formValidator = new FormValidation(validationConfig);
  const [state, setState] = useState<StateType>(initialState);
  const { name, email, password, showPassword, isLoading, valError } = state;
  const { signup } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const classes = useStyles();

  const updateState = (updated: Partial<StateType>) => {
    setState((old) => ({ ...old, ...updated }));
  };

  const submitForm = () => {
    const { areInputsValid, validationErrors } = formValidator.validate({
      email,
      password,
      name,
    });
    updateState({ isLoading: true, valError: validationErrors });

    if (areInputsValid) {
      signup(name, email, password)
        .then(() => navigate('/'))
        .catch(() =>
          updateState({
            isLoading: false,
            valError: [...validationErrors, 'email-taken'],
          })
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
        error={valError.includes('email') || valError.includes('email-taken')}
        helperText={
          valError.includes('email')
            ? t('user.invalid email')
            : valError.includes('email-taken')
            ? t('user.email already used')
            : null
        }
        onChange={(e) => updateState({ email: e.target.value })}
      />
      <TextField
        id="name"
        label={t('user.name')}
        value={name}
        autoComplete="name"
        classes={{ root: classes.inputFieldRoot }}
        variant="outlined"
        fullWidth
        error={valError.includes('name')}
        helperText={valError.includes('name') ? t('user.not empty') : null}
        onChange={(e) => updateState({ name: e.target.value })}
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
                size="large">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={valError.includes('password')}
        helperText={
          valError.includes('password')
            ? t('user.invalid pw')
            : t('user.pw advice')
        }
        onChange={(e) => updateState({ password: e.target.value })}
      />
      <Typography
        variant="body2"
        component="p"
        color="secondary"
        className={classes.marginTop}
      >
        {t('user.agree to terms')}
      </Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={() => submitForm()}
        className={classes.button}
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? <CircularProgress size={22} /> : t('signup')}
      </Button>
    </form>
  );
};

export default Signup;
