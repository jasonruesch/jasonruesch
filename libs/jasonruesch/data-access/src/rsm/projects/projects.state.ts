import { StoreState } from '@jasonruesch/data-access';
import { Project } from './projects.model';

// *******************************************************************
// Types and initializers
// *******************************************************************

/**
 * This state is serializable
 */
export interface ProjectsState extends StoreState {
  allProjects: Project[];
  searchQuery: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  selectedProjectId?: string;
}

/**
 * Read-only values computed from existing/updated state
 */
export interface ProjectsComputedState {
  selectedProject?: Project;
  errors: string[];
}

/**
 * This is a simple API meant for use within the
 * UI layer html templates
 */
export interface ProjectsApi {
  // Projects RAVE (Remove, Add, View, Edit) - synonymous with CRUD
  loadAll: (
    query?: string,
    sortBy?: string,
    sortDirection?: 'asc' | 'desc',
  ) => Promise<Project[]>; // View
  findById: (id: string) => Promise<Project | null>; // View
  add: (partial: Omit<Project, 'id' | 'createdAt'>) => Promise<Project>; // Add
  edit: (project: Project, optimistic?: boolean) => Promise<Project>; // Edit
  remove: (project: Project) => Promise<boolean>; // Remove
  select: (project: Project) => void;
}

export type ProjectsViewModel = ProjectsState &
  ProjectsComputedState &
  ProjectsApi;
