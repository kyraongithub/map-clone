import { GoogleMap, MarkerF } from "@react-google-maps/api";
import InputMap from "components/Input";
import { store } from "context/redux";
import { connect } from "react-redux";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const Maps = () => {
  const { coordinates } = store.getState();

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={16}
    >
      <InputMap />
      <MarkerF position={coordinates} />
    </GoogleMap>
  );
};

const mapStateToProps = (state: any) => {
  return { coordinates: state.coordinates };
};

export default connect(mapStateToProps)(Maps);
