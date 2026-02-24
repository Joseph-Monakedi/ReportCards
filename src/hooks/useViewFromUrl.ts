import { useSyncExternalStore } from "react";
import { getViewFromUrl, subscribeToUrlChanges } from "../utils/urlState";

export function useViewFromUrl() {
  return useSyncExternalStore(
    subscribeToUrlChanges,
    getViewFromUrl,
    getViewFromUrl
  );
}