import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { StoreApi, createStore } from 'zustand/vanilla';

import {
  computeWith,
  getErrorMessages,
  initStoreState,
  trackStatusWith,
  upsert,
  waitFor,
} from '@jasonruesch/data-access';
import { InjectionToken } from '@jasonruesch/data-access-react';
import { Project } from './projects.model';
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from './projects.service';
import {
  ProjectsApi,
  ProjectsComputedState,
  ProjectsState,
  ProjectsViewModel,
} from './projects.state';

// *******************************************************************
// Initializers
// *******************************************************************

/**
 * These ACTIONS enable waitFor() to look up existing, async request (if any)
 */
const ACTIONS = {
  loadAll: () => 'projects:loadAll',
  findById: (id: string) => `projects:findById:${id}`,
  add: () => `projects:add`,
  edit: (id: string) => `projects:edit:${id}`,
  remove: (id: string) => `projects:remove:${id}`,
};

const initState = (): ProjectsState => ({
  ...initStoreState(),
  allProjects: [],
  searchQuery: '',
  sortBy: 'name',
  sortDirection: 'asc',
});

// *******************************************************************
// Dependency Injection Tokens/Types
// *******************************************************************

export const ProjectsStore = new InjectionToken('ProjectsStore');

// *******************************************************************
// ProjectsStore Factory
// *******************************************************************

/**
 * Create an instance of the Zustand store engine for Projects
 */
export function buildProjectsStore(): StoreApi<ProjectsViewModel> {
  // Calculate our computed properties
  const buildComputedFn = (state: ProjectsState): ProjectsComputedState => {
    const selectedProject = state.allProjects.find(
      (it) => it.id === state.selectedProjectId,
    );
    const errors = getErrorMessages(state);

    return {
      selectedProject,
      errors,
    };
  };

  /**
   * Factory to create a Zustand Reactive ProjectsStore; which emits a ProjectsViewModel
   */
  const configureStore = (
    set: (
      state:
        | Partial<ProjectsState>
        | ((state: ProjectsState) => Partial<ProjectsState>),
    ) => void,
    get: () => ProjectsState,
    store: StoreApi<ProjectsViewModel>,
  ): ProjectsViewModel => {
    set = computeWith(buildComputedFn, store);

    const trackStatus = trackStatusWith(set, get);

    const state: ProjectsState = initState();
    const computed: ProjectsComputedState = buildComputedFn(state);
    const api: ProjectsApi = {
      loadAll: async (
        query?: string,
        sortBy = 'name',
        sortDirection?: 'asc' | 'desc',
      ): Promise<Project[]> => {
        const { allProjects } = await trackStatus(async () => {
          const sortKey = sortBy ?? get().sortBy;
          sortDirection =
            sortDirection ??
            (sortBy
              ? sortBy === get().sortBy && get().sortDirection === 'asc'
                ? 'desc'
                : 'asc'
              : get().sortDirection);
          const allProjects = await getProjects(query, sortKey, sortDirection);

          return {
            allProjects,
            searchQuery: query || '',
            sortBy: sortKey,
            sortDirection,
          };
        }, ACTIONS.loadAll());

        return allProjects;
      },
      findById: async (id: string): Promise<Project | null> => {
        const project = await waitFor<Project | null>(
          () => getProject(id),
          ACTIONS.findById(id),
        );

        return project;
      },
      add: async (
        partial: Omit<Project, 'id' | 'createdAt'>,
      ): Promise<Project> => {
        let created = partial as Project;

        await trackStatus(async () => {
          created = await createProject(partial);
          // const allProjects = await get().allProjects;
          const { searchQuery, sortBy, sortDirection } = get();
          const allProjects = await api.loadAll(
            searchQuery,
            sortBy,
            sortDirection,
          ); // reload all projects with existing search query and sorting

          return {
            // allProjects: upsert(created, allProjects),
            allProjects,
            searchQuery: '',
            selectedProjectId: created.id,
          };
        }, ACTIONS.add());

        return created;
      },
      edit: async (project: Project, optimistic = false): Promise<Project> => {
        let updated = project;

        await trackStatus(async () => {
          if (optimistic) {
            set((state: ProjectsState) => ({
              allProjects: upsert(project, state.allProjects),
            }));
          }

          updated = await updateProject(project);
          // const allProjects = await get().allProjects;
          const { searchQuery, sortBy, sortDirection } = get();
          const allProjects = await api.loadAll(
            searchQuery,
            sortBy,
            sortDirection,
          ); // reload all projects with existing search query and sorting

          return {
            // allProjects: upsert(updated, allProjects),
            allProjects,
            searchQuery: '',
            selectedProjectId: updated.id,
          };
        }, ACTIONS.edit(project.id));

        return updated;
      },
      remove: async (project: Project): Promise<boolean> => {
        let deleted = false;

        await trackStatus(async () => {
          deleted = await deleteProject(project.id);
          // const allProjects = await get().allProjects;
          const { searchQuery, sortBy, sortDirection } = get();
          const allProjects = await api.loadAll(
            searchQuery,
            sortBy,
            sortDirection,
          ); // reload all projects with existing search query and sorting

          return {
            // allProjects: deleted
            //   ? allProjects.filter((it) => it.id !== project.id)
            //   : allProjects,
            allProjects,
            selectedProjectId: '',
          };
        }, ACTIONS.remove(project.id));

        return deleted;
      },
      select: (project: Project) => {
        set({ selectedProjectId: project.id });
      },
    };

    // Initial Store view model
    return {
      ...state,
      ...computed,
      ...api,
    };
  };

  /**
   * Enable the ReactiveStore for Redux DevTools, and persistence to localStorage,
   * and ensure the ViewModel is immutable using Immer
   */
  const store = createStore<ProjectsViewModel>()(
    // prettier-ignore
    devtools(
      immer(
        configureStore
      ), 
      { name: 'store:projects' }
    ),
  );

  return store;
}

// *******************************************************************
// Singleton instance of the Zustand store engine for Projects
// *******************************************************************

let _store: StoreApi<ProjectsViewModel>;

export const store = () => {
  if (!_store) {
    _store = buildProjectsStore();
    // On app startup, determine if we have search params in the URL
    syncStoreWithUrl(_store);
  }

  return _store;
};

// *******************************************************************
// Bookmark URL Synchronizer
// *******************************************************************

export interface ProjectsUrlParams {
  q?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
  id?: string;
  forceSkeleton?: boolean;
}
export const syncUrlWithStore = (state?: ProjectsViewModel) => {
  const defaultState: ProjectsState = initState();

  state = state ?? store().getState();
  const { searchQuery, sortBy, sortDirection, selectedProjectId } = state;
  const { pathname } = window.location;
  const searchParams = new URLSearchParams({
    ...(searchQuery ? { q: searchQuery } : {}),
    ...(sortBy && sortBy !== defaultState.sortBy ? { sort: sortBy } : {}),
    ...(sortDirection && sortDirection !== defaultState.sortDirection
      ? { direction: sortDirection }
      : {}),
    // Only include the selectedProjectId if it is not already in the URL as a path param
    ...(selectedProjectId && !pathname.includes(`/${selectedProjectId}`)
      ? { id: selectedProjectId }
      : {}),
  });

  const url = `${pathname}${searchParams.toString() ? `?${searchParams}` : ''}`;

  if (window.location.href !== url) {
    window.history.replaceState({}, '', url);
  }
};

const syncStoreWithUrl = async (_store: StoreApi<ProjectsViewModel>) => {
  const { search } = window.location;
  const searchParams = new URLSearchParams(search);
  const searchQuery = searchParams.get('q') ?? undefined;
  const sortBy = searchParams.get('sort') ?? undefined;
  const sortDirection = searchParams.get('direction') ?? undefined;
  const selectedProjectId = searchParams.get('id') ?? undefined;
  const forceSkeleton = searchParams.get('forceSkeleton') ?? false;

  const { getState: get, setState: set } = _store;
  set({ selectedProjectId, forceSkeleton: Boolean(forceSkeleton) });

  if (searchQuery || sortBy || sortDirection) {
    get().loadAll(
      searchQuery,
      sortBy,
      sortDirection as 'asc' | 'desc' | undefined,
    );
  }
};
