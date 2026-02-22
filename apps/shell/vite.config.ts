import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "shell",
			remotes: {
				dashboard: "http://localhost:5001/assets/remoteEntry.js",
				tasks: "http://localhost:5002/assets/remoteEntry.js",
				profile: "http://localhost:5003/assets/remoteEntry.js",
			},
			shared: [
				"react",
				"react-dom",
				"react-router-dom",
				"zustand",
				"@mui/material",
				"@emotion/react",
				"@emotion/styled",
				"@mindease/shared",
			],
		}),
	],
	server: {
		port: 5000,
		strictPort: true,
		cors: true
	},
	preview: {
		port: 5000,
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
