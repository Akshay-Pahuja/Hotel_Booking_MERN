import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  city: undefined,
  startDate: undefined,
  endDate: undefined,
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  useEffect(() => {
    const startDate = localStorage.getItem("startDate");
    const endDate = localStorage.getItem("endDate");

    if (startDate && endDate) {
      dispatch({
        type: "NEW_SEARCH",
        payload: {
          ...state,
          startDate,
          endDate,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (state.startDate && state.endDate) {
      localStorage.setItem("startDate", state.startDate);
      localStorage.setItem("endDate", state.endDate);
    }
  }, [state.startDate, state.endDate]);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        startDate: state.startDate,
        endDate: state.endDate,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
