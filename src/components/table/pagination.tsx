import { useGridRootProps, GridSlotsComponentsProps } from "@mui/x-data-grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Box, MenuItem, Typography } from "@mui/material";
import PrevPageIcon from "../../assets/icons/arrow.svg";

export const Pagination: React.FC<
  NonNullable<GridSlotsComponentsProps["footer"]>
> = () => {
  const rootProps = useGridRootProps();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageSize = parseInt(searchParams.get("Page.PageSize") || "10");

  const totalPages =
    rootProps.rowCount && pageSize
      ? Math.ceil(rootProps.rowCount / pageSize)
      : 0;

  const onChange = (e: SelectChangeEvent) => {
    searchParams.set("Page.PageSize", e.target.value);
    setSearchParams(searchParams, { replace: true });
  };

  const handlePageChange = ({ selected: valueNumber }: any) => {
    searchParams.set("Page.PageNumber", `${valueNumber + 1}`);
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#F6F5F5",
        marginTop: 10,
        padding: "0 30px",
        minHeight: 69,
      }}
    >
      <Typography>Total: {totalPages} pages</Typography>
      <Box display={"flex"} alignItems={"center"}>
        <Box display={"flex"} alignItems={"center"}>
          <p>Per page: &nbsp;</p>
          <Select
            style={{
              height: "40px",
              borderRadius: 10,
              backgroundColor: "#FFF",
            }}
            value={`${pageSize}` || "10"}
            onChange={onChange}
          >
            <MenuItem value={10}>10</MenuItem>
            {rootProps.rowCount && rootProps.rowCount > 10 ? (
              <MenuItem value={20}>20</MenuItem>
            ) : null}
            {rootProps.rowCount && rootProps.rowCount > 20 ? (
              <MenuItem value={50}>50</MenuItem>
            ) : null}
            {rootProps.rowCount && rootProps.rowCount > 50 ? (
              <MenuItem value={100}>100</MenuItem>
            ) : null}
          </Select>
        </Box>
        <ReactPaginate
          breakLabel="..."
          className="pagination"
          nextLabel={
            <img
              alt="Prev Page"
              className="prev-page"
              src={PrevPageIcon}
              style={{ transform: "rotate(180deg)" }}
            />
          }
          pageCount={totalPages}
          pageRangeDisplayed={3}
          previousLabel={
            <img alt="Prev Page" className="next-page" src={PrevPageIcon} />
          }
          renderOnZeroPageCount={null}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};
