import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "tasks",
			filename: "remoteEntry.js",
			exposes: {
				"./Tarefas": "./src/Tarefas.tsx",
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
		port: 5002,
		strictPort: true,
	},
	preview: {
		port: 5002,
		strictPort: true,
	},
	build: {
		target: "esnext",
		minify: false,
		cssCodeSplit: false,
	},
});
