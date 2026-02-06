import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "profile",
			filename: "remoteEntry.js",
			exposes: {
				"./Perfil": "./src/Perfil.tsx",
				"./Config": "./src/Config.tsx",
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
		port: 5003,
		strictPort: true,
	},
	preview: {
		port: 5003,
		strictPort: true,
	},
	build: {
		target: "esnext",
		minify: false,
		cssCodeSplit: false,
	},
});
