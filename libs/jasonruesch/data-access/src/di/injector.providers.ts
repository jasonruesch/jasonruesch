import {
  DependencyInjector,
  makeInjector,
} from '@jasonruesch/data-access-react';
import {
  ProjectsService,
  ProjectsStore,
  buildProjectsStore,
  createProjectsService,
} from '../rsm';

/**
 * Dependency injector with registered Projects API
 */
export const buildInjector = (): DependencyInjector => {
  return makeInjector([
    {
      provide: ProjectsService,
      useFactory: createProjectsService,
    },
    {
      provide: ProjectsStore,
      useFactory: buildProjectsStore,
      deps: [ProjectsService],
    },
  ]);
};
