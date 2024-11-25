import { useCallback } from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router';

import { getPage, getPageIndex, navigateEventChannel } from '../utils';

interface CustomNavLinkProps {
  to: string;
}

export type PageNavLinkProps = CustomNavLinkProps &
  Omit<NavLinkProps, 'to'> &
  React.RefAttributes<HTMLAnchorElement>;

export const PageNavLink = ({
  to,
  onMouseOver,
  onTouchStart,
  ref,
  ...props
}: PageNavLinkProps) => {
  const { pathname } = useLocation();
  const pageIndex = getPageIndex(to);
  const page = getPage(to);

  const handleMouseOver = useCallback(
    (
      event:
        | React.MouseEvent<HTMLAnchorElement>
        | React.TouchEvent<HTMLAnchorElement>,
    ) => {
      if (event instanceof TouchEvent) {
        onTouchStart?.(event as React.TouchEvent<HTMLAnchorElement>);
      } else {
        onMouseOver?.(event as React.MouseEvent<HTMLAnchorElement>);
      }

      navigateEventChannel.emit('onWillNavigate', {
        page,
        pageIndex,
        pathname,
      });
    },
    [page, pageIndex, pathname, onMouseOver, onTouchStart],
  );

  return (
    <NavLink
      ref={ref}
      {...props}
      to={to}
      end={props.end || to === '/'}
      onMouseOver={handleMouseOver}
      onTouchStart={handleMouseOver}
    >
      {props.children}
    </NavLink>
  );
};
