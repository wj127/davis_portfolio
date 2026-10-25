import { createClient } from 'next-sanity';

export const projectId = 'db3qh9tf';
export const dataset = 'production';
export const apiVersion = '2026-05-15';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
