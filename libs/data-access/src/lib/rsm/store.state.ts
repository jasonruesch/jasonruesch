import { waitFor } from './store.utils';

export type RestErrorMessage = { memberNames?: string[]; errorMessage: string };
export type RestErrors = RestErrorMessage[];

// ****************************************************
// Store State
// ****************************************************

type Errors = { errors?: RestErrors };

/**
 * Selector to quickly determine isLoading state
 */
export type StoreState = {
  requestStatus: StatusState;

  // These are computed values based on request status
  showSkeleton?: boolean; // if not initialized or transitioning to loading
  isLoading?: boolean; // if busy
  isReady: boolean; // state == 'success'
  forceSkeleton?: boolean; // if we want to force the skeleton to show
};

export function initStoreState(): StoreState {
  return {
    requestStatus: { value: 'initializing' },
    showSkeleton: true,
    isLoading: false,
    isReady: false,
    forceSkeleton: false,
  };
}

// ****************************************************
// Status State
// ****************************************************

export declare type StatusState =
  | InitializingState
  | PendingState
  | SuccessState
  | ErrorState;
export interface SuccessState {
  value: 'success';
}
export interface PendingState {
  value: 'pending';
}
export interface InitializingState {
  value: 'initializing';
}
export interface ErrorState {
  value: 'error';
  errors: RestErrors;
}

// ****************************************************
// Status Map Functions
// ****************************************************

/**
 * With 'ready' async action:
 *  -  update loading status
 *  -  trigger async action
 *  -  update with action data AND updated status
 */
export function trackStatusWith<T extends StoreState>(
  set: (state: Partial<T> | ((state: T) => Partial<T>)) => void,
  get: () => T,
) {
  return async (
    action: () => Promise<Partial<T>>,
    waitForId?: string,
  ): Promise<T> =>
    waitFor(async () => {
      if (get().forceSkeleton) return get();

      // Track isLoading state
      set(updateRequestStatus('pending'));

      // Introduce a delay for the skeleton to display a minimum amount of time
      if (get().showSkeleton)
        await new Promise((resolve) => setTimeout(resolve, 450));

      try {
        // Trigger async action
        const updates = await action();
        // Update status
        const withUpdatedRequestStatus = updateRequestStatus<T>('success');
        // Update with action data AND updated status
        set((state: T) => withUpdatedRequestStatus({ ...state, ...updates }));
      } catch (error) {
        console.error(error);

        const withUpdatedRequestStatus = updateRequestStatus<T>('error');
        set((state: T) =>
          withUpdatedRequestStatus({ ...state, errors: [`${error}`] }),
        );
      }

      return get();
    }, waitForId);
}

export const getRequestStatus = (state: StoreState) => {
  return state.requestStatus;
};

export const getErrorMessages = (state: StoreState): string[] => {
  const errors = (state.requestStatus as ErrorState).errors || [];
  return errors.map((it) => (it as RestErrorMessage).errorMessage);
};

export const getIsInitializing = (s: StoreState) =>
  getRequestStatus(s).value === 'initializing';
export const getIsLoading = (s: StoreState) =>
  getRequestStatus(s).value === 'pending';
export const getIsReady = (s: StoreState) =>
  getRequestStatus(s).value === 'success';

export function updateRequestStatus<T extends StoreState>(
  flag: 'initializing' | 'pending' | 'success' | 'error',
  updates?: Partial<T> & Errors,
) {
  return (state: T): Partial<T> => {
    const wasInitializing = getIsInitializing(state);
    state = {
      ...state,
      requestStatus: resolveStatus(flag, updates?.errors),
    };

    return {
      ...state,
      // Update raw values for view models
      showSkeleton:
        getIsInitializing(state) || (wasInitializing && getIsLoading(state)),
      isLoading: getIsLoading(state),
      isReady: getIsReady(state),
    };
  };
}

// ****************************************************
// Internal Status Utils
// ****************************************************

function resolveStatus(flag: StatusState['value'], errors?: RestErrors) {
  const newStatus = {
    value: flag,
  } as StatusState;

  if (flag === 'error') {
    newStatus.value = 'error';
    (newStatus as ErrorState).errors = errors || [];

    // Debugging
    if (errors?.length) console.log(errors);
  }

  return newStatus;
}
