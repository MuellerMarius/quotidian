import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import { LinkProps } from '../types/proptypes';

const LinkMenuItem: React.FC<LinkProps> = ({ to, onClick, ...rest }) => {
  const navigate = useNavigate();

  return (
    <MenuItem
      {...rest}
      onClick={(event) => {
        onClick && onClick(event);
        navigate(to);
      }}
    />
  );
};

export default LinkMenuItem;
