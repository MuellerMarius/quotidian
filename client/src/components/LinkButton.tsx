import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from '@mui/material';
import { LinkProps } from '../types/proptypes';

// TODO: unused
const LinkButton: React.FC<LinkProps & ButtonProps> = ({
  to,
  onClick,
  ...rest
}) => {
  const navigate = useNavigate();

  return (
    <Button
      {...rest}
      onClick={(event) => {
        onClick && onClick(event);
        navigate(to);
      }}
    />
  );
};

export default LinkButton;
