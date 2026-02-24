import { useSyncExternalStore } from "react";
import { getFiltersFromUrl, subscribeToUrlChanges } from "../utils/urlState";

export function useFiltersFromUrl() {
  const snapshot = useSyncExternalStore(
    subscribeToUrlChanges,
    () => JSON.stringify(getFiltersFromUrl()),
    () => JSON.stringify(getFiltersFromUrl())
  );
  return JSON.parse(snapshot);
}