
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

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
		languageOptions: {
			parserOptions: {
				project: true, // <--- "true" means "Find the closest tsconfig.json for this file"
				tsconfigRootDir: import.meta.dirname, // <--- Anchor it to the root
			},
		},
		plugins: {
			'simple-import-sort': simpleImportSort, // Register Sorting Plugin
			'import-x': importX, // Import X Plugin
		},
		rules: {
			'no-console': ['warn', { allow: ['info', 'error'] }],
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

			// Import Sorting Rules
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// Group 1: Node.js built-ins.
						['^node:', '^bun:', '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'],
						// Group 2: External packages (npm).
						['^@?\\w'],
						// Group 3: Internal packages (@codergrounds).
						['^@codergrounds'],
						// Group 4: Parent imports (put .. first).
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						// Group 5: Relative imports (put . last).
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
						// Group 6: Side effect imports.
						['^\\u0000'],
						// Group 7: Type imports.
						['^.+\\u0000$'],
					],
				},
			],
			'simple-import-sort/exports': 'error',

			'import-x/no-default-export': 'error',
		},
	},
	// EXCEPTIONS (Override)
	{
		files: [
			'**/*.config.{js,ts,mjs}', // Config files
			'apps/frontend/src/pages/**/*', // Next.js/Route pages often need default
			'apps/frontend/src/layouts/**/*',
		],
		rules: {
			'import-x/no-default-export': 'off', // Allow defaults here
		},
	},
	// Disable import sorting for container.ts (preserves commented import groups)
	{
		files: ['apps/backend/src/app.ts', 'apps/backend/src/container.ts'],
		rules: {
			'simple-import-sort/imports': 'off',
			'simple-import-sort/exports': 'off',
		},
	},
	// Prettier must be last to override everything else
	prettier
);