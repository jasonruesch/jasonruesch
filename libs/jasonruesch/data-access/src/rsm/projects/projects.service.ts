import { faker } from '@faker-js/faker';
import { InjectionToken } from '@jasonruesch/data-access-react';
import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';
import projects from '../../data/projects';
import { Project } from './projects.model';

/**
 * Publish async API methods for CRUD (Create, Read, Update, Delete) operations
 * Note: use localforage offline storage for all stored projects
 */

const allProjects = async (): Promise<Project[]> => {
  let storedProjects = await localforage.getItem<Project[]>('projects');
  if (!storedProjects) {
    storedProjects = await set(projects);
  }

  return storedProjects;
};

// Read
export async function getProjects(
  query = '',
  sortKey = 'name',
  sortDirection = 'asc',
): Promise<Project[]> {
  await fakeNetwork(`projects:${query}`);

  let projects = await allProjects();
  if (query) {
    projects = matchSorter(projects, query, { keys: ['name'] });
  }

  return projects.sort(
    sortBy(sortDirection === 'asc' ? `${sortKey}` : `-${sortKey}`),
  );
}

// Read
export async function getProject(id: string): Promise<Project | null> {
  await fakeNetwork(`project:${id}`);

  const projects = await allProjects();
  const project = projects.find((project) => project.id === id);

  return project ?? null;
}

// Create
export async function createProject(
  partial: Omit<Project, 'id' | 'createdAt'>,
): Promise<Project> {
  await fakeNetwork();

  const projects = await allProjects();
  const newProject = {
    id: faker.string.uuid(),
    ...partial,
    createdAt: Date.now(),
  } satisfies Project;
  await set([newProject, ...projects]);

  return newProject;
}

// Update
export async function updateProject(updated: Project): Promise<Project> {
  await fakeNetwork();

  const projects = await allProjects();
  const existing = projects.find((project) => project.id === updated.id);
  if (!existing) throw new Error(`No project found for ${updated.id}`);

  updated = { ...existing, ...updated };
  await set(projects.map((it) => (it.id === updated.id ? updated : it)));

  return updated;
}

// Delete
export async function deleteProject(id: string): Promise<boolean> {
  await fakeNetwork();

  const projects = await allProjects();
  const index = projects.findIndex((project) => project.id === id);
  if (index > -1) {
    projects.splice(index, 1);
    await set(projects);

    return true;
  }

  return false;
}

function set(projects: Project[]) {
  return localforage.setItem('projects', projects);
}

// Fake a cache so we don't slow down stuff we've already seen
let fakeCache: Record<string, Promise<boolean>> = {};

async function fakeNetwork(key = '') {
  if (!key) fakeCache = {};

  if (!fakeCache[key]) {
    fakeCache[key] = new Promise((resolve) => {
      const timeout = Math.random() * 800;

      console.debug('fakeNetwork', { key, timeout });

      setTimeout(resolve, timeout);
    });
  }

  return fakeCache[key];
}

export const ProjectsService = new InjectionToken('ProjectsService');

export function createProjectsService() {
  return {
    getProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject,
  };
}
