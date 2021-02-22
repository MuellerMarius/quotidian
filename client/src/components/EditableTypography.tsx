import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import {
  createStyles,
  IconButton,
  InputBase,
  makeStyles,
  Theme,
  Tooltip,
} from '@material-ui/core';
import { EditableTypoProps } from '../types/proptypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      fontFamily: theme.typography.body1.fontFamily,
      fontSize: theme.typography.body1.fontSize,
      margin: 0,
      padding: 0,
    },
    iconRoot: {
      width: '0.65em',
      height: '0.65em',
      color: '#1890ff',
    },
    iconButtonRoot: { marginLeft: 3 },
  })
);

const EditableTypography: React.FC<EditableTypoProps> = (props) => {
  const { text, onSubmit, onEscape, autoFocus } = props;
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(autoFocus);
  const [beforeEditing, setBeforeEditing] = useState(text);
  const [value, setValue] = useState(text);
  const classes = useStyles();

  const toggleEditing = () => {
    setIsEditing((val) => !val);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setBeforeEditing(e.target.value);
    e.target.select();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Escape':
        setValue(beforeEditing);
        if (onEscape) onEscape();
        toggleEditing();
        break;
      case 'Enter':
        handleSubmit();
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (text !== value) {
      onSubmit(value);
    } else if (onEscape) {
      onEscape();
    }
    toggleEditing();
  };

  if (isEditing) {
    return (
      <InputBase
        value={value}
        inputProps={{ 'aria-label': value }}
        onBlur={handleSubmit}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        endAdornment={
          <Tooltip title={<>{t('save')}</>} aria-label={t('save')} arrow>
            <IconButton
              type="submit"
              size="small"
              onClick={handleSubmit}
              aria-label={t('save')}
              classes={{ root: classes.iconButtonRoot }}
            >
              <SaveOutlinedIcon classes={{ root: classes.iconRoot }} />
            </IconButton>
          </Tooltip>
        }
        classes={{ input: classes.inputRoot }}
        autoFocus
      />
    );
  }

  return (
    <span>
      {value}
      <Tooltip title={<>{t('edit')}</>} aria-label={t('edit')} arrow>
        <IconButton
          size="small"
          onClick={toggleEditing}
          aria-label={t('edit')}
          classes={{ root: classes.iconButtonRoot }}
        >
          <BorderColorOutlinedIcon classes={{ root: classes.iconRoot }} />
        </IconButton>
      </Tooltip>
    </span>
  );
};

export default EditableTypography;
