export enum ViewType {
  list = "list",
  Carousel = "carousel"
}
export enum SortType {
  name = "name",
  score = "score"}
export enum GradeFilter {
  All = "all" ,
  A = "A",
  B = "B" ,
  Fail = "Fail"
}

const URL_CHANGE_EVENT = "urlchange";


function getSearchParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

function notifyUrlChange() {
  window.dispatchEvent(new Event(URL_CHANGE_EVENT));
}


export function setUrlParam(key: string, value: string) {
  const url = new URL(window.location.href);

  if (!value || value === "all") {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }

  window.history.pushState({}, "", url.toString());

  notifyUrlChange();
}

export function getViewFromUrl(): ViewType {
  const params = getSearchParams();
  return params.get(("view")) === ViewType.Carousel ? ViewType.Carousel : ViewType.list;
}


export interface UrlFilters {
  grade: GradeFilter;
  sort: SortType;
  search: string;
}

export function getFiltersFromUrl(): UrlFilters {
  const params = getSearchParams();

  return {
    grade: (params.get("grade") as GradeFilter) || "all",
    sort: (params.get("sort") as SortType) || "name",
    search: params.get("search") || "",
  };
}

export function subscribeToUrlChanges(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(URL_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(URL_CHANGE_EVENT, callback);
  };
}