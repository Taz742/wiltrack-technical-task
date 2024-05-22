import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
export type OrderType = 'Desc' | 'Asc';

type IOrder = {
  name: string;
  order: OrderType;
};

export interface ITableRequestParams {
  sortFields?: IOrder[];
  search?: string;
  page: number;
  pageSize: number;
  [key: string]: any;
}

function useTableRequestParams(): ITableRequestParams {
  const [searchParams] = useSearchParams();

  const params = useMemo(() => {
    const sortFields =
      searchParams.get("Sorts.OrderField") &&
      searchParams.get("Sorts.SortOrder")
        ? [
            {
              name: searchParams.get("Sorts.OrderField")!,
              order: searchParams.get("Sorts.SortOrder")! as OrderType,
            },
          ]
        : [];

    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("Page.PageNumber") || "1");
    const pageSize = parseInt(searchParams.get("Page.PageSize") || "10");

    return {
      sortFields,
      search,
      page,
      pageSize,
    } as ITableRequestParams;
  }, [searchParams]);

  return params;
}

export default useTableRequestParams;
