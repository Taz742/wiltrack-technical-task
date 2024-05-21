interface ICoordinate {
  lat: string | number;
  lng: string | number;
}

interface IPolygonData {
  subAreaId: string;
  subareaName: string;
  coordinates: ICoordinate[];
}

export interface IPolygonFormData {
  id?: string;
  name: string;
  fee: number;
  selections: IPolygonData[];
}
