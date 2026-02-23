import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "dashboard",
			filename: "remoteEntry.js",
			exposes: {
				"./Painel": "./src/Painel.tsx",
				"./Plataforma": "./src/Plataforma.tsx",
			},
			shared: [
				"react",
				"react-dom",
				"zustand",
				"@mui/material",
				"@emotion/react",
				"@emotion/styled",
				"@mindease/shared",
			],
		}),
	],
	server: {
		port: 5001,
		strictPort: true,
		cors: true
	},
	preview: {
		port: 5001,
		strictPort: true,
		cors: true
	},
	build: {
		target: "esnext",
		minify: false,
		cssCodeSplit: false,
	},
	test: {
    	globals: true,
    	environment: 'jsdom',
    	setupFiles: '@mindease/shared/tests/setup',
  	},
});
