

const initialState = {
    param: undefined,
    candle: []

};

const auth = (state = initialState, action) => {
  
  switch (action.type) {
    case "setParam": {
        return {
          ...state,
          param: action.data
        }
    }
    case "setCandle": {
        return {
          ...state,
          candle: action.data
        }
    }
    default: {
      return state;
    }
  }
};

export default auth;