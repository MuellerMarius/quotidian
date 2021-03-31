import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import FormValidation from '../../util/FormValidation';
import { FormValidationConfig } from '../../types/types';

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

const validationConfig: FormValidationConfig[] = [
  {
    inputName: 'email',
    rules: [{ type: 'email' }],
  },
  {
    inputName: 'user',
    rules: [{ type: 'nonEmptyField' }],
  },
  {
    inputName: 'password',
    rules: [{ type: 'password' }],
  },
];

const Signup = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const formValidator = new FormValidation(validationConfig);
  const [valError, setValError] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    const { areInputsValid, validationErrors } = formValidator.validate({
      email,
      password,
      user,
    });
    setValError(validationErrors);

    if (areInputsValid) {
      alert('Login');
    }
  };

  return (
    <>
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
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="user"
        label={t('user.username')}
        value={user}
        autoComplete="user"
        classes={{ root: classes.inputFieldRoot }}
        variant="outlined"
        fullWidth
        error={valError.includes('user')}
        helperText={valError.includes('user') ? t('user.not empty') : null}
        onChange={(e) => setUser(e.target.value)}
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
                onClick={() => setShowPassword((v) => !v)}
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
        error={valError.includes('password')}
        helperText={
          valError.includes('password')
            ? t('user.invalid pw')
            : t('user.pw advice')
        }
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => submitForm()}
        className={classes.button}
        fullWidth
      >
        {t('signup')}
      </Button>
    </>
  );
};

export default Signup;
