import { StoreApi } from 'zustand';
import { StoreState } from './store.state';

// *****************************************************
// Computed State Helpers
// *****************************************************

export type SetState<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean,
) => void;
export type ComputedState<T extends StoreState, U = unknown> = (state: T) => U;

/**
 * This is not middleware, but a utility function to create a store
 * with computed properties.
 */
export function computeWith<T extends StoreState, U = unknown>(
  buildComputed: ComputedState<T, U>,
  store: StoreApi<T>,
): SetState<T> {
  const originalSet = store.setState;

  // Set state updates & updated computed fields
  const setWithComputed = (update: (state: T) => T, replace: boolean) => {
    originalSet((state: T) => {
      const updated = typeof update === 'object' ? update : update(state);
      const computedState = buildComputed({ ...state, ...updated });
      return { ...updated, ...computedState };
    }, replace);
  };

  /**
   * create the store with the `set()` method tail-hooked to compute properties
   */
  store.setState = setWithComputed; // for external-to-store use

  return store.setState;
}
