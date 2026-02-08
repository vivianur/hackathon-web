import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StateCreator, StoreApi } from "zustand";
import type { UseBoundStore } from "zustand";

const STORE_REGISTRY_KEY = "__MINDEASE_STORES__";

function getStoreRegistry(): Record<string, unknown> {
	if (typeof window === "undefined") return {};
	const win = window as unknown as Record<string, unknown>;
	if (!win[STORE_REGISTRY_KEY]) {
		win[STORE_REGISTRY_KEY] = {};
	}
	return win[STORE_REGISTRY_KEY] as Record<string, unknown>;
}

export function createSingletonStore<T>(
	storeCreator: StateCreator<T, [["zustand/persist", unknown]]>,
	config: { name: string },
): UseBoundStore<StoreApi<T>> {
	const registry = getStoreRegistry();
	console.log(
		`[createSingletonStore] registry state for "${config.name}":`,
		registry[config.name] ? "EXISTS (reusing)" : "NOT FOUND (creating new)",
	);

	if (registry[config.name]) {
		console.log(
			`[createSingletonStore] returning existing store for "${config.name}"`,
		);
		return registry[config.name] as UseBoundStore<StoreApi<T>>;
	}

	console.log(`[createSingletonStore] creating new store for "${config.name}"`);
	const store = create<T>()(persist(storeCreator, config));
	registry[config.name] = store;
	console.log(
		`[createSingletonStore] stored in registry, total stores:`,
		Object.keys(registry).length,
	);
	return store;
}
