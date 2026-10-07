import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'db3qh9tf',
  dataset: 'production',
  apiVersion: '2026-05-15',
  useCdn: false,
});
