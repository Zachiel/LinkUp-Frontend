/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
// import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react';

import mkcert from 'vite-plugin-mkcert';

import { resolve } from 'path';

import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		https: true,
		host: true,
		port: 5173,
		strictPort: true,
	},
	plugins: [svgr(), react(), mkcert()],
	test: {
		globals: true,
		environment: 'jsdom',
		css: true,
		setupFiles: './tests/setup.ts',
		exclude: ['**/node_modules/**'],
	},
	build: {
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`,
			},
		},
	},
	resolve: {
		alias: [
			{
				find: '@components',
				replacement: resolve(__dirname, './src/components/'),
			},
			{
				find: '@hooks',
				replacement: resolve(__dirname, './src/hooks/'),
			},
			{
				find: '@assets',
				replacement: resolve(__dirname, './src/assets/'),
			},
			{
				find: '@layouts',
				replacement: resolve(__dirname, './src/layouts/'),
			},
			{
				find: '@middleware',
				replacement: resolve(__dirname, './src/middleware/'),
			},
			{
				find: '@pages',
				replacement: resolve(__dirname, './src/pages/'),
			},
			{
				find: '@data',
				replacement: resolve(__dirname, './src/data/'),
			},
			{
				find: '@utils',
				replacement: resolve(__dirname, './src/utils/'),
			},
			{
				find: '@scripts',
				replacement: resolve(__dirname, './src/scripts/'),
			},
			{
				find: '@icons',
				replacement: resolve(__dirname, './src/assets/icons/'),
			},
			{
				find: '@contexts',
				replacement: resolve(__dirname, './src/contexts/'),
			},
			{
				find: '@router',
				replacement: resolve(__dirname, './src/router/'),
			},
			{
				find: '@styles',
				replacement: resolve(__dirname, './src/styles/'),
			},
		],
	},
});
