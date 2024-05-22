import { DataGrid, GridSortModel } from "@mui/x-data-grid";

import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Pagination } from "./pagination";
import { Box } from "@mui/material";

const MoreHorizIcon = () => (
  <svg
    fill="none"
    height="25"
    viewBox="0 0 24 25"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0.5C9.62663 0.5 7.30655 1.20379 5.33316 2.52236C3.35977 3.84094 1.8217 5.71508 0.913451 7.9078C0.00519943 10.1005 -0.232441 12.5133 0.230582 14.8411C0.693605 17.1689 1.83649 19.307 3.51472 20.9853C5.19295 22.6635 7.33115 23.8064 9.65892 24.2694C11.9867 24.7324 14.3995 24.4948 16.5922 23.5865C18.7849 22.6783 20.6591 21.1402 21.9776 19.1668C23.2962 17.1934 24 14.8734 24 12.5C23.9965 9.31848 22.7311 6.26829 20.4814 4.01862C18.2317 1.76894 15.1815 0.503529 12 0.5ZM12 21.8333C10.154 21.8333 8.34954 21.2859 6.81468 20.2604C5.27982 19.2348 4.08355 17.7772 3.37713 16.0717C2.67071 14.3663 2.48588 12.4896 2.84601 10.6792C3.20614 8.86867 4.09505 7.20563 5.40034 5.90034C6.70563 4.59505 8.36867 3.70613 10.1792 3.346C11.9896 2.98587 13.8663 3.17071 15.5717 3.87712C17.2772 4.58354 18.7348 5.77982 19.7604 7.31468C20.7859 8.84953 21.3333 10.654 21.3333 12.5C21.3307 14.9745 20.3465 17.347 18.5967 19.0967C16.847 20.8465 14.4745 21.8307 12 21.8333ZM10.2222 12.5C10.2222 12.8516 10.118 13.1953 9.92262 13.4877C9.72727 13.78 9.44962 14.0079 9.12477 14.1425C8.79993 14.277 8.44248 14.3122 8.09762 14.2436C7.75277 14.175 7.436 14.0057 7.18737 13.7571C6.93874 13.5084 6.76943 13.1917 6.70083 12.8468C6.63223 12.502 6.66744 12.1445 6.802 11.8197C6.93655 11.4948 7.16441 11.2172 7.45677 11.0218C7.74912 10.8265 8.09284 10.7222 8.44445 10.7222C8.91594 10.7222 9.36813 10.9095 9.70153 11.2429C10.0349 11.5763 10.2222 12.0285 10.2222 12.5ZM17.3333 12.5C17.3333 12.8516 17.2291 13.1953 17.0337 13.4877C16.8384 13.78 16.5607 14.0079 16.2359 14.1425C15.911 14.277 15.5536 14.3122 15.2087 14.2436C14.8639 14.175 14.5471 14.0057 14.2985 13.7571C14.0499 13.5084 13.8805 13.1917 13.8119 12.8468C13.7433 12.502 13.7785 12.1445 13.9131 11.8197C14.0477 11.4948 14.2755 11.2172 14.5679 11.0218C14.8602 10.8265 15.2039 10.7222 15.5556 10.7222C16.0271 10.7222 16.4792 10.9095 16.8126 11.2429C17.146 11.5763 17.3333 12.0285 17.3333 12.5Z"
      fill="#181818"
    />
  </svg>
);

const CustomDataGrid = styled(DataGrid)`
  .MuiDataGrid-withBorderColor {
    border-color: rgba(24, 24, 24, 0.05);
  }

  .MuiDataGrid-main {
    margin: 0 30px;
  }
`;

const noRowsOverlay = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      sx={{ height: "100%" }}
    >
      No rows to display
    </Box>
  );
};

interface IProps {
  rows: any[];
  columns: any[];
  totalCount?: number;
  paginated?: boolean;
  className?: string;
}

export const Table = ({
  rows,
  columns,
  totalCount,
  paginated = true,
  className,
}: IProps) => {
  const [muiTableKey, setMuiTableKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortModelChange = (model: GridSortModel) => {
    if (!model.length) {
      searchParams.delete("Sorts.SortOrder");
      searchParams.delete("Sorts.OrderField");
    } else {
      searchParams.set(
        "Sorts.SortOrder",
        model[0].sort === "asc" ? "Asc" : "Desc"
      );
      searchParams.set("Sorts.OrderField", model[0].field);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const handleClearAllFilters = () => {
    setMuiTableKey(muiTableKey + 1);
  };

  return (
    <CustomDataGrid
      autoHeight
      disableColumnMenu
      disableRowSelectionOnClick
      keepNonExistentRowsSelected
      className={className}
      columns={columns}
      density="comfortable"
      key={muiTableKey}
      rowCount={totalCount}
      rowHeight={60}
      rows={rows}
      slotProps={{
        toolbar: {
          printOptions: { disableToolbarButton: true },
          onClearAllFilters: handleClearAllFilters,
        },
      }}
      slots={{
        moreActionsIcon: MoreHorizIcon,
        noRowsOverlay: noRowsOverlay,
        pagination: paginated ? Pagination : (null as any),
      }}
      sortingMode="server"
      sx={{ borderWidth: 0, width: "100%", mx: "auto" }}
      onSortModelChange={handleSortModelChange}
    />
  );
};
