import {
    PAGE_DATA_LOADED
} from "./constants";

export const initialState = {
    list: [],
    total: 0,
    start: 0,
    pageOffset: 25,
};

const reducer = (state = initialState, {type, data}) => {
    switch(type) {
        case PAGE_DATA_LOADED:{
            return {
                ...state,
                ...data,
            }
        }
    }
    return state;
}
export default reducer;