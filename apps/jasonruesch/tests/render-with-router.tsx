import { render } from '@testing-library/react';
import React, { isValidElement } from 'react';
import { RouteObject, RouterProvider, createMemoryRouter } from 'react-router';

export function renderWithRouter(
  children: React.ReactElement | RouteObject,
  routes: RouteObject[] = [],
) {
  const options = isValidElement(children)
    ? { element: children, path: '/' }
    : children;

  const router = createMemoryRouter([{ ...options }, ...routes], {
    initialEntries: options.path ? [options.path] : [],
    initialIndex: 1,
  });

  return render(<RouterProvider router={router} />);
}
