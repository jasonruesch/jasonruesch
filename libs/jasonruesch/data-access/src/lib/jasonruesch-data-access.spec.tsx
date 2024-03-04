import { render } from '@testing-library/react';

import JasonrueschDataAccess from './jasonruesch-data-access';

describe('JasonrueschDataAccess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<JasonrueschDataAccess />);
    expect(baseElement).toBeTruthy();
  });
});
