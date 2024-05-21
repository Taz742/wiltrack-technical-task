import { useRef, useState } from "react";

import {
  GoogleMap,
  Polygon,
  InfoWindow,
  DrawingManager,
} from "@react-google-maps/api";

import { MapContainer, Container } from "./styles";

import { polygonOptions, defaultCenter } from "./constants";
import { Appbar } from "../../components/app-bar";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { AddOrEditZone } from "./add-or-edit-zone-popup";
import { IPolygonFormData } from "./typs";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

export const DrawPolygon = () => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [infoWindowDataIndex, setInfoWindowDataIndex] = useState(-1);

  const [center, setCenter] = useState<google.maps.LatLngLiteral | undefined>(
    defaultCenter
  );

  const mapRef = useRef();
  const polygonRefs = useRef<google.maps.Polygon[]>([]);
  const activePolygonIndex = useRef<number>();
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager>();

  const methods = useForm<IPolygonFormData>({
    defaultValues: {
      name: "",
      fee: undefined,
      selections: [],
    },
    mode: "all",
  });

  const { control, watch } = methods;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "selections",
  });

  const watchFieldArray = watch("selections");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const onPolygonClick = (index: number) => {
    setInfoWindowOpen(true);
    setInfoWindowDataIndex(index);

    document
      .getElementById(`selection-${index + 1}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCloseInfoWindow = () => {
    setInfoWindowOpen(false);
    setInfoWindowDataIndex(-1);
  };

  const onEditPolygon = (index: number) => {
    const polygonRef = polygonRefs.current[index];

    if (polygonRef) {
      const coordinates = polygonRef
        .getPath()
        .getArray()
        .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      const allPolygons = [...(fields as any)];
      allPolygons[index] = coordinates;
      
      update(index, {
        ...controlledFields[index],
        coordinates: coordinates,
      });
    }
  };

  const onLoadMap = (map: any) => {
    mapRef.current = map;
  };

  const onLoadPolygon = (polygon: google.maps.Polygon, index: number) => {
    polygonRefs.current[index] = polygon;
  };

  const onClickPolygon = (index: number) => {
    activePolygonIndex.current = index;
  };

  const onLoadDrawingManager = (
    drawingManager: google.maps.drawing.DrawingManager
  ) => {
    drawingManagerRef.current = drawingManager;
  };

  const onOverlayComplete = (
    $overlayEvent: google.maps.drawing.OverlayCompleteEvent
  ) => {
    drawingManagerRef.current?.setDrawingMode(null);

    if ($overlayEvent.type === google.maps.drawing.OverlayType.POLYGON) {
      const newPolygon = ($overlayEvent?.overlay as any)
        ?.getPath()
        .getArray()
        .map((latLng: google.maps.LatLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));

      const startPoint = newPolygon[0];
      newPolygon.push(startPoint);

      append({
        subAreaId: "",
        subareaName: "",
        coordinates: newPolygon,
      });

      $overlayEvent.overlay?.setMap(null);
    }
  };

  const drawingManagerOptions = {
    polygonOptions: polygonOptions,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYGON],
    },
  };

  const onRemovePolygon = (polygonIndex: number) => {
    remove(polygonIndex);
  };

  const onSelectionClick = (index: number) => {
    if (fields[index].coordinates[0]) {
      setCenter(fields[index].coordinates[0] as any);
    }
  };

  const handleFormSubmit: SubmitHandler<any> = async (data) => {};

  const infoWindowData =
    infoWindowDataIndex > -1 ? controlledFields[infoWindowDataIndex] : null;

  return (
    <Container>
      <Appbar title="Parking zones" />
      <MapContainer>
        <AddOrEditZone
          methods={methods}
          fields={fields}
          handleFormSubmit={handleFormSubmit}
          handleSelectionClick={onSelectionClick}
          handleRemovePolygon={onRemovePolygon}
        />
        <GoogleMap
          center={center}
          mapContainerStyle={containerStyle}
          zoom={15}
          onLoad={onLoadMap}
          onTilesLoaded={() => setCenter(undefined)}
        >
          <DrawingManager
            options={drawingManagerOptions}
            onLoad={onLoadDrawingManager}
            onOverlayComplete={onOverlayComplete}
          />
          {fields.map((field: any, index: number) => (
            <Polygon
              draggable
              editable
              key={index}
              options={polygonOptions}
              paths={field.coordinates}
              onClick={() => onPolygonClick(index)}
              onDragEnd={() => onEditPolygon(index)}
              onLoad={(event) => onLoadPolygon(event, index)}
              onMouseDown={() => onClickPolygon(index)}
              onMouseUp={() => onEditPolygon(index)}
            />
          ))}
          {infoWindowOpen && infoWindowData ? (
            <InfoWindow
              position={{
                lat: infoWindowData.coordinates[0].lat as any,
                lng: infoWindowData.coordinates[0].lng as any,
              }}
              onCloseClick={handleCloseInfoWindow}
            >
              <div>
                <p>
                  <b>Subarea name:</b> {infoWindowData.subareaName}
                </p>
                <p>
                  <b>Subarea ID:</b> {infoWindowData.subAreaId}
                </p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </MapContainer>
    </Container>
  );
};
