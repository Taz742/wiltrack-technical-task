import { Routes, Route } from "react-router-dom";
import { ParkingList } from "../pages/parking-list";
import { ParkingZone } from "../pages/parking-zones";

export function Routing() {
  return (
    <Routes>
      <Route path="/" element={<ParkingList />} />
      <Route path="/add-zone" element={<ParkingZone />} />
      <Route path="/edit-zone/:id" element={<ParkingZone />} />
    </Routes>
  );
}
