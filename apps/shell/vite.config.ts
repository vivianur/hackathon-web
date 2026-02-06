import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "shell",
			remotes: {
				dashboard: "http://localhost:3000/mf/dashboard/assets/remoteEntry.js",
				tasks: "http://localhost:3000/mf/tasks/assets/remoteEntry.js",
				profile: "http://localhost:3000/mf/profile/assets/remoteEntry.js",
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
	},
	preview: {
		port: 5000,
		strictPort: true,
	},
	build: {
		target: "esnext",
		minify: false,
		cssCodeSplit: false,
	},
});
