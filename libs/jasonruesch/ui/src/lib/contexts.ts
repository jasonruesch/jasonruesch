import { createContext } from 'react';

export const RouteContext = createContext<{
  previous?: string;
  current?: string;
}>({});
