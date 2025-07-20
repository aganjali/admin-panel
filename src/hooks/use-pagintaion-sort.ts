import {
  createParser,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { useLatestCallback } from "./use-latest-callback";
import { useDebounceCallback } from "./use-debounce-callback";
import { ColumnSort } from "@tanstack/react-table";

export const AvailablePageSizes = [10, 15, 20, 30, 40, 50];
export const DefaultPageSize = AvailablePageSizes[1];

export type Props = {};
const DEFAULT_PARAMS = {};

// ------------------------------------------------------------------
// 1. The Custom Sort Parser
// ------------------------------------------------------------------
// This parser converts URL sort parameters to a descriptive state and back.
// URL State: "+name", "name", "-name"
// App State: "name ASC", "name DESC"

export const sortParser = createParser<ColumnSort>({
  /**
   * Converts a value from the URL search params to the value in state.
   * @param value - The string from the URL, e.g., "-name"
   * @returns The string for the app state, e.g., {id:"name", desc:true}
   */
  parse: (value) => {
    if (!value) return null;
    return { id: value.substring(1), desc: value.startsWith("-") };
  },

  /**
   * Converts a value from state to the value in the URL search params.
   * @param value - The sorting from the app state, e.g., {id:"name", desc:true}
   * @returns The string for the URL, e.g., "name"
   */
  serialize: (value) => {
    return `${value.desc ? "-" : "+"}${value.id}`;
  },
});

const parser = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(DefaultPageSize),
  sort: sortParser,
  q: parseAsString.withDefault(""),
};

export function usePaginationSortFilter({}: {} = DEFAULT_PARAMS) {
  const [urlParams, setUrlParams] = useQueryStates(parser);
  const resetPage = useLatestCallback(() => setUrlParams({ page: 1 }));

  const handleFilterChange = useDebounceCallback(
    useLatestCallback((q: string | null) => setUrlParams({ q, page: 1 })),
    500
  );
  const handlePageChange = useLatestCallback((page: number) =>
    setUrlParams({ page })
  );
  const handlePageSizeChange = useLatestCallback((pageSize: number) =>
    setUrlParams({ pageSize, page: 1 })
  );
  const handleSortChange = useLatestCallback((sort: ColumnSort[] | null) =>
    setUrlParams({ sort: sort?.length ? sort[0] : null, page: 1 })
  );

  return {
    params: urlParams,
    setParams: setUrlParams,
    resetPage,
    handleFilterChange,
    handlePageChange,
    handlePageSizeChange,
    handleSortChange,
    query: {
      SkipCount: (urlParams.page - 1) * urlParams.pageSize,
      MaxResultCount: urlParams.pageSize,
      Sorting: urlParams.sort
        ? `${urlParams.sort.id} ${urlParams.sort.desc ? "DESC" : "ASC"}`
        : undefined,
      Filter: urlParams.q || undefined,
    },
  };
}
