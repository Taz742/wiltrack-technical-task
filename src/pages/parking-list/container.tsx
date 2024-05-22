import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { AppBar } from "../../components/app-bar";
import { Table } from "../../components/table";
import useActionColumns from "../../hooks/useActionColumns";
import { columns } from "./columns";
import useTableRequestParams from "../../hooks/useTableRequestParams";
import { IPolygonFormData } from "../parking-zones/typs";

export const ParkingList = () => {
  const navigate = useNavigate();

  const { page, pageSize, search, sortFields } = useTableRequestParams();

  const handleEditZone = (zone: IPolygonFormData) => {
    navigate(`/edit-zone/${zone.id}`);
  };

  const actionColumn = useActionColumns({
    handleEdit: handleEditZone,
  });

  const listQuery = useQuery({
    queryKey: ["list", page, pageSize, search, sortFields],
    queryFn: async () =>
      (
        await axios.get(
          `https://run.mocky.io/v3/4ef7ad41-ac7d-4da4-ab5b-a908ec627080?page=${page}&pageSize=${pageSize}&search=${search}&sortFields=${sortFields}`
        )
      ).data,
  });

  return (
    <>
      <AppBar title="Parking List" />
      {listQuery.isLoading && <h2>Loading....</h2>}
      {listQuery.isError && <h2>Error loading data!!!</h2>}
      {listQuery.isSuccess && (
        <Table
          columns={[...columns, actionColumn]}
          rows={listQuery.data}
          totalCount={listQuery?.data?.length}
        />
      )}
    </>
  );
};
