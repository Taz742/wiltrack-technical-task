import { useEffect, useRef, useState } from "react";

import {
  GoogleMap,
  Polygon,
  InfoWindow,
  DrawingManager,
} from "@react-google-maps/api";

import { MapContainer, Container } from "./styles";

import { polygonOptions, defaultCenter } from "./constants";
import { AppBar } from "../../components/app-bar";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { AddOrEditZone } from "./add-or-edit-zone";
import { IPolygonFormData } from "./typs";
import { Box, Button, Modal, Typography, useMediaQuery } from "@mui/material";
import useModal from "../../hooks/useModal";
import resolver from "./resolver";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "calc(100vh - 100px)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 1,
};

export const ParkingZone = () => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [infoWindowDataIndex, setInfoWindowDataIndex] = useState(-1);

  const { isOpen, closeModal, openModal } = useModal();

  const [center, setCenter] = useState<google.maps.LatLngLiteral | undefined>(
    defaultCenter
  );

  const hidden = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  const params = useParams();

  const detailsQuery = useQuery({
    queryKey: ["details", params.id],
    enabled: !!params.id,
    queryFn: async () =>
      (
        await axios.get(
          `https://run.mocky.io/v3/72613afd-850e-4835-83bb-3ac328e7971d/${params.id}`
        )
      ).data,
  });

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
    resolver: resolver as any,
    mode: "all",
  });

  const { control, setValue, watch } = methods;

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

  useEffect(() => {
    if (detailsQuery.isSuccess) {
      setValue("name", detailsQuery.data.name);
      setValue("fee", detailsQuery.data.fee);
      setValue("selections", detailsQuery.data.selections);

      const firstSelection = detailsQuery.data.selections[0];

      if (firstSelection) {
        if (firstSelection.coordinates[0]) {
          setCenter(firstSelection.coordinates[0]);
        }
      }
    }
  }, [detailsQuery.isSuccess, detailsQuery.data, setValue]);

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
        capacity: undefined,
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

  const handleFormSubmit: SubmitHandler<IPolygonFormData> = async (data) => {
    console.log(JSON.stringify(data));
  };

  const infoWindowData =
    infoWindowDataIndex > -1 ? controlledFields[infoWindowDataIndex] : null;

  return (
    <Container>
      <AppBar title="Parking zones" />
      {!hidden && (
        <>
          <Button onClick={openModal} variant="contained" sx={{ m: 4 }}>
            Edit Details
          </Button>
          <Modal open={isOpen} onClose={closeModal}>
            <Box sx={style}>
              <AddOrEditZone
                isInModal
                methods={methods}
                fields={fields}
                handleFormSubmit={handleFormSubmit}
                handleSelectionClick={onSelectionClick}
                handleRemovePolygon={onRemovePolygon}
              />
            </Box>
          </Modal>
        </>
      )}
      <MapContainer>
        {hidden && (
          <AddOrEditZone
            isInModal={false}
            methods={methods}
            fields={fields}
            handleFormSubmit={handleFormSubmit}
            handleSelectionClick={onSelectionClick}
            handleRemovePolygon={onRemovePolygon}
          />
        )}
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
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="caption">
                  <b>Subarea name:</b> {infoWindowData.subareaName}
                </Typography>
                <Typography variant="caption">
                  <b>Subarea ID:</b> {infoWindowData.subAreaId}
                </Typography>
              </Box>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </MapContainer>
    </Container>
  );
};
