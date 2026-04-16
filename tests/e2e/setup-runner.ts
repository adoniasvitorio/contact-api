import { setupE2E, teardownE2E } from './setup';

beforeAll(async () => {
  await setupE2E();
});

afterAll(async () => {
  await teardownE2E();
});