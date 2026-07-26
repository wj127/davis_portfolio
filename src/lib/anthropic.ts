import Anthropic from '@anthropic-ai/sdk';

// Validate that the API key is configured
if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error(
    'Missing ANTHROPIC_API_KEY environment variable. ' +
      'Get your API key from https://console.anthropic.com/settings/keys',
  );
}

/**
 * Singleton Anthropic client instance
 *
 * Usage:
 * ```ts
 * import { anthropic } from '@/lib/anthropic';
 *
 * const message = await anthropic.messages.create({
 *   model: 'claude-sonnet-4-5',
 *   max_tokens: 4096,
 *   messages: [{ role: 'user', content: 'Hello' }],
 * });
 * ```
 */
export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
