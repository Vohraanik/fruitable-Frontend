import { ADD_ORGANIC, DELETE_ORGANIC, EDIT_ORGANIC, ERROR_ORGANIC, GET_ORGANIC, LOADING_ORGANIC,} from '../ActionType';

const initialState = {
    isLoading: false,
    organic: [],
    error: null
};

export const organicReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOADING_ORGANIC:
            return {
                ...state,
                isLoading: true
            };

        case ERROR_ORGANIC:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }    

        case GET_ORGANIC:
            return {
                isLoading: false,
                organic: action.payload,
                error: null
            };
        case ADD_ORGANIC:
            return {
                isLoading: false,
                organic: state.organic.concat(action.payload),
                error: null
            };
        case DELETE_ORGANIC:
            return {
                isLoading: false,
                organic: state.organic.filter((v) => v.id !== action.payload),
                error: null
            };
        case EDIT_ORGANIC:
            return {
                isLoading: false,
                organic: state.organic.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                }),
                error: null
            };
        default:
            return state;
    }
};
