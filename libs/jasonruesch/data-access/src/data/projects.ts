import { faker } from '@faker-js/faker';
import { Project } from '../rsm/projects';

// Generate 10 projects using faker
const projects: Project[] = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.word.noun(),
  description: faker.lorem.paragraph(),
  createdAt: faker.date.recent().getTime(),
}));

export default projects;
