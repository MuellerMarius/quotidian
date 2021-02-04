import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import { LinkProps } from '../types/proptypes';

const LinkMenuItem: React.FC<RouteComponentProps & LinkProps> = ({
  history,
  location,
  to,
  onClick,
  ...rest
}) => (
  <MenuItem
    {...rest}
    onClick={(event) => {
      onClick && onClick(event);
      history.push(to);
    }}
  />
);

export default withRouter(LinkMenuItem);
