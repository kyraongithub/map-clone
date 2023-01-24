import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { store } from "../store";

export const handleAddress = (value: string) => {
  store.dispatch({
    type: "SET_ADDRESS",
    value,
  });
};

export const handleSelect = async (value: string) => {
  const res = await geocodeByAddress(value);
  const latLng = await getLatLng(res[0]);
  store.dispatch({ type: "SET_ADDRESS", value });
  store.dispatch({ type: "SET_COORDINATE", value: latLng });
};

export const handleHistory = (history: object[], item: object) => {
  const historyTemp = [...history];
  historyTemp.unshift(item);
  store.dispatch({ type: "SET_HISTORY", value: historyTemp });
};
