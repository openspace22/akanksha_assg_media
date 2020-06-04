import {
    PAGE_DATA_LOADED
} from "./constants"
export const initialState = {
    totalHit: 0
}
const favouriteSWReducer  = (state = initialState, action) => {
    const { type, data } = action
    switch(type){
        case PAGE_DATA_LOADED: {
            return {
                ...state,
                ...data
            }
        }
    }
    return state;
}
export default favouriteSWReducer;