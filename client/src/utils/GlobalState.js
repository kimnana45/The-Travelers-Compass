import React, { createContext, useReducer, useContext } from "react";
import {
  SET_CURRENT_IDEA,
  REMOVE_IDEA,
  UPDATE_IDEAS,
  ADD_IDEA,
  ADD_FAVORITE,
  UPDATE_FAVORITES,
  REMOVE_FAVORITE,
  LOADING
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
  case SET_CURRENT_IDEA:
    return {
      ...state,
      currentIdea: action.idea,
      loading: false
    };

  case UPDATE_IDEAS:
    return {
      ...state,
      ideas: [...action.ideas],
      loading: false
    };

  case ADD_IDEA:
    return {
      ...state,
      ideas: [action.idea, ...state.ideas],
      loading: false
    };

  case REMOVE_IDEA:
    return {
      ...state,
      ideas: state.ideas.filter((idea) => {
        return idea._id !== idea._id; 
      })
    };

  case ADD_FAVORITE:
    return {
      ...state,
      favorites: [action.idea, ...state.favorites],
      loading: false
    };

  case UPDATE_FAVORITES:
    return {
      ...state,
      favorites: [...state.favorites],
      loading: false
    };

  case REMOVE_FAVORITE:
    return {
      ...state,
      favorites: state.favorites.filter((idea) => {
        return idea._id !== action._id; 
      })
    };

  case LOADING:
    return {
      ...state,
      loading: true
    };

  default:
    return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    ideas: [],
    currentIdea: {
      _id: 0,
      whatToDo: "",
      address: "",
      author: ""
    },
    favorites: [],
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };