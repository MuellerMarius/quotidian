import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
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
];

const ResetPassword = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const formValidator = new FormValidation(validationConfig);
  const [valError, setValError] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    const { areInputsValid, validationErrors } = formValidator.validate({
      email,
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
      <Button
        color="primary"
        variant="contained"
        onClick={() => submitForm()}
        className={classes.button}
        fullWidth
      >
        {t('user.request pw reset')}
      </Button>
    </>
  );
};

export default ResetPassword;
