import { LoadScript } from "@react-google-maps/api";

import { Loading } from "./components/loading";
import { DrawPolygon } from "./pages/parking-zones";

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

function App() {
  return (
    <LoadScript
      googleMapsApiKey={MAPS_API_KEY!}
      id="script-loader"
      language="en"
      libraries={["drawing", "places"]}
      loadingElement={<Loading />}
      region="us"
    >
      <DrawPolygon />
    </LoadScript>
  );
}

export default App;
