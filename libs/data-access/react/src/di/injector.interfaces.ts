/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectionToken } from './injector.token';
import { Type } from './types.utils';

export type Token =
  | string
  | number
  | InjectionToken<string>
  | (new (...args: any[]) => any);

export interface TypeProvider extends Type<any> {
  deps?: any[];
}

export interface Provider {
  provide: Token;
  useClass?: any;
  useValue?: any;
  useFactory?: (...args: any[]) => any;
  deps?: any[];
}

export type UndoChanges = () => void;

export interface DependencyInjector {
  get: (token: Token) => any;
  reset: () => void;
  instanceOf: (token: Token) => any;
  addProviders: (registry: Provider[]) => UndoChanges;
  getFlatProviderTree: () => Provider[];
}
