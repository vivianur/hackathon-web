import type { StoreApi } from "zustand";

const SYNC_EVENT = "mindease-store-sync";

interface SyncDetail {
	storeName: string;
}

interface PersistStore<T> extends StoreApi<T> {
	persist: { rehydrate: () => void | Promise<void> };
}

/**
 * Adds cross-instance sync to a Zustand persist store.
 * When one instance updates, it broadcasts a CustomEvent so
 * other instances (from different MF remotes in the same window)
 * rehydrate from localStorage and stay in sync.
 */
export function enableStoreSync<T>(
	store: PersistStore<T>,
	storeName: string,
): () => void {
	if (typeof window === "undefined") {
		return () => {};
	}

	let isSyncing = false;

	// Broadcast changes to other instances
	const unsubscribe = store.subscribe(() => {
		if (isSyncing) return;
		window.dispatchEvent(
			new CustomEvent(SYNC_EVENT, { detail: { storeName } }),
		);
	});

	// Listen for changes from other instances
	const handler = (e: Event) => {
		const detail = (e as CustomEvent<SyncDetail>).detail;
		if (detail.storeName === storeName) {
			isSyncing = true;
			const result = store.persist.rehydrate();
			if (result && typeof result.then === "function") {
				result.then(() => {
					isSyncing = false;
				});
			} else {
				isSyncing = false;
			}
		}
	};

	window.addEventListener(SYNC_EVENT, handler);

	return () => {
		unsubscribe();
		window.removeEventListener(SYNC_EVENT, handler);
	};
}
