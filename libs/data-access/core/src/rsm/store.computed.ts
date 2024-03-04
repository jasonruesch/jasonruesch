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

// ---------------------------------------------- //
// Alternate version
// ---------------------------------------------- //

// // *****************************************************
// // Computed State Helpers
// // *****************************************************

// export type UpdateStateCallback<T> = (state: T) => T | Partial<T>;
// export type UpdateState<T = unknown> = (state: T | Partial<T> | UpdateStateCallback<T>, replace?: boolean) => void;

// export type ComputeState<S, CS> = (state: S) => CS;

// /**
//  * This is not middleware, but a utility function to add "derived property" functionality
//  * to a a store. Derived properties are computed properties that are based on the state of the store.
//  *
//  * Anytime the state is set, we will automatically recompute the derived properties.
//  */
// export function computeWith<S extends StoreState, CS = unknown>(
//   buildComputed: ComputeState<S, CS>,
//   store: StoreApi<S>,
// ): UpdateState<S> {
//   const origSetState = store.setState;

//   // Set state updates & updated computed fields
//   const setWithComputed = (update: S | Partial<S> | UpdateStateCallback<S>, replace?: boolean) => {
//     origSetState((state: S) => {
//       const updated = typeof update === 'object' ? update : update(state);
//       const computedState = buildComputed({ ...state, ...(updated || {}) }); // tail hook original update() fn to add computed state
//       return { ...updated, ...computedState };
//     }, replace);
//   };

//   /**
//    * Override store::set() method to head-hook and compute properties;
//    * this override is only for external-to-store use
//    */

//   store.setState = setWithComputed;
//   return setWithComputed;
// }
