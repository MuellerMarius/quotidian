import React, { useState } from 'react';
import {
  Button,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';

const useStyles = makeStyles({
  focusVisible: {
    outline: '1px solid #39406d',
  },
});

const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { i18n } = useTranslation();
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang?: string) => {
    if (lang) {
      i18n.changeLanguage(lang);
    }

    setAnchorEl(null);
  };

  return (
    <>
      <Button
        disableRipple
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<LanguageOutlinedIcon fontSize="small" color="primary" />}
        classes={{ focusVisible: classes.focusVisible }}
      >
        {languages.find((element) => element.acr === i18n.language)?.display ||
          'Language'}
      </Button>

      <Menu
        id="language-menu"
        elevation={2}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
      >
        {languages.map((value) => (
          <MenuItem onClick={() => handleClose(value.acr)} key={value.acr}>
            <ListItemText primary={value.display} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
