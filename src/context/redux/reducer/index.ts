const initialState = {
  address: "",
  coordinates: {
    lat: 0,
    lng: 0,
  },
  history: [],
};

type Action = {
  type: string;
  value: any;
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.value,
      };
    case "SET_COORDINATE":
      return {
        ...state,
        coordinates: action.value,
      };
    case "SET_HISTORY":
      return {
        ...state,
        history: action.value,
      };
  }
  return state;
};

export default reducer;
