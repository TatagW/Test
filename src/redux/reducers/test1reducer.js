const initialState = {
    favs: [],
    myQuotes: []
};

const auth = (state = initialState, action) => {
  
  switch (action.type) {
    case "addFavs": {
        return {
            ...state,
            favs: [...state.favs, action.data]
        }
    }
    case "addQuotes": {
      return {
          ...state,
          myQuotes: [...state.myQuotes, action.data]
      }
  }
    default: {
      return state;
    }
  }
};

export default auth;