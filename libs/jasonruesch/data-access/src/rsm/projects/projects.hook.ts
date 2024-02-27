// *******************************************************************
// React HOOKS
// *******************************************************************

import { formatDate } from '@jasonruesch/data-access';
import { useZustandStore } from '@jasonruesch/data-access-react';
import { useEffect } from 'react';
import { Project } from './projects.model';
import { ProjectsViewModel } from './projects.state';
import { store, syncUrlWithStore } from './projects.store';

interface ProjectsEventHandlers {
  handleSort: (key: string) => void;
  handleAdd: () => boolean;
  handleEdit: (project: Project, e: React.MouseEvent<unknown>) => boolean;
  handleRemove: (project: Project, e: React.MouseEvent<unknown>) => boolean;
  handleSelect: (project: Project, e: React.MouseEvent<unknown>) => void;
  isSelected: (project: Project) => boolean;
}

/**
 * Hook to build and use Projects store
 */
export function useProjects(
  syncUrl = false,
  selector: (state: ProjectsViewModel) => Partial<ProjectsViewModel> = (
    state,
  ) => state,
): ProjectsViewModel & ProjectsEventHandlers {
  // const store = inject<StoreApi<ProjectsViewModel>>(ProjectsStore);
  const vm = useZustandStore(store(), selector);
  const {
    showSkeleton,
    searchQuery,
    selectedProjectId,
    loadAll,
    add,
    edit,
    remove,
    select,
  } = vm;

  const isSelected = (project: Project) => project.id === selectedProjectId;

  // Event handlers
  const handleSort = (key: string) => {
    loadAll?.(searchQuery, key);
  };

  const handleAdd = () => {
    const name = prompt('Enter a name for the project');
    const description = prompt('Enter a description for the project');
    const imageUrl =
      prompt(
        'Enter an image URL for the project',
        'https://via.placeholder.com/300x225?text=Project+Image',
      ) ?? undefined;
    if (name && description) {
      add?.({ name, description, imageUrl });

      return true;
    }

    return false;
  };

  const handleEdit = (project: Project, e: React.MouseEvent<unknown>) => {
    e.stopPropagation();

    const name = prompt('Enter a new name for the project', project.name);
    if (name) {
      edit?.({ ...project, name });

      return true;
    }

    return false;
  };

  const handleRemove = (project: Project, e: React.MouseEvent<unknown>) => {
    e.stopPropagation();

    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm('Are you sure you want to remove this project?');
    if (confirmed) {
      remove?.(project);

      return true;
    }

    return false;
  };

  const handleSelect = (project: Project, e: React.MouseEvent<unknown>) => {
    e.stopPropagation();

    select?.(project);

    alert(`You selected the following project:
${'' /* Intential blank line */}
ID: ${project.id}
Name: ${project.name}
Description: ${project.description}
Created: ${formatDate(project.createdAt)}
    `);
  };

  useEffect(() => {
    // Whenever the state changes, update the URL
    if (syncUrl) syncUrlWithStore();
  }, [vm, syncUrl]);

  useEffect(() => {
    if (showSkeleton) loadAll?.();
  }, [showSkeleton, loadAll]);

  return {
    ...(vm as ProjectsViewModel), // TODO: Remove this cast
    handleSort,
    handleAdd,
    handleEdit,
    handleRemove,
    handleSelect,
    isSelected,
  };
}

/**
 * Hook to load specific project by ID
 */
export type ProjectByIdResults = [Project | undefined, ProjectsViewModel];

export function useProjectById(id: string): ProjectByIdResults {
  const vm = useProjects();
  const project = vm.allProjects.find((it) => it.id === id);

  return [project, vm];
}
