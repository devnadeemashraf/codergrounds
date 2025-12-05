
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig(
	// Global ignores must be in their own object
	{
		ignores: ['**/dist/**', '**/node_modules/**'],
	},
	// Base JS config
	js.configs.recommended,
	// TS recommended configs (spread the array)
	...tseslint.configs.recommended,
	// Custom rules
	{
		rules: {
			'no-console': ['warn', { allow: ['info', 'error'] }],
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	},
	// Prettier must be last to override everything else
	prettier
);