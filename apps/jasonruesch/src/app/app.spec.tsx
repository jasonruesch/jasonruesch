import { Home } from '@jasonruesch/jasonruesch-ui';
import ResizeObserver from 'resize-observer-polyfill';

import { renderWithRouter } from '../../tests';
import App from './app';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addEventListener: noop,
    removeEventListener: noop,
  }),
  writable: true,
});
global.ResizeObserver = ResizeObserver;

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithRouter(
      {
        path: '/*',
        element: <App />,
      },
      [{ path: '/', element: <Home /> }],
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getAllByText } = renderWithRouter(
      {
        path: '/*',
        element: <App />,
      },
      [{ path: '/', element: <Home /> }],
    );
    expect(getAllByText(/Jason Ruesch/i)).toBeTruthy();
  });
});
