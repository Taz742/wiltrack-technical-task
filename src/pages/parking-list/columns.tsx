import { GridColDef } from '@mui/x-data-grid';
import { IPolygonFormData } from '../parking-zones/typs';

export const columns: (GridColDef<IPolygonFormData>)[] = [
  {
    field: 'name',
    headerName: 'Name',
    hideable: false,
    flex: 0.1,
    renderCell: (params: any) => {
      return params.value;
    },
  },
  {
    field: 'fee',
    headerName: 'Fee',
    hideable: false,
    flex: 0.1,
    renderCell: (params: any) => {
      return params.value.toFixed(2);
    },
  },
];
