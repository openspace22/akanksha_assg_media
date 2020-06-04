import {
    PAGE_DATA_LOADED,
    CAT_DATA_LOADED,
    ITEM_DATA_LOADED,
    LOAD_PAGE_DATA
} from "./constants";
export const initialState = {
    categoriesMap: {},
    selectedCatItems: [],
    selectedCatKey: "",
    itemInfo: null,
    selectedItemId: ""
}
const starInfoReducer = (state = initialState, action) => {
    const {type, data} = action;
    switch(type){
        case LOAD_PAGE_DATA: {
            return {
                ...state,
                isLoading: true
            }
        }
        case PAGE_DATA_LOADED:
            return {
                ...state,
                ...data,
                isLoading: false
            }
        case CAT_DATA_LOADED: 
            return {
                ...state,
                ...data,
                itemInfo: null,
                selectedItemId: ""
            }
        case ITEM_DATA_LOADED:
            return {
                ...state,
                ...data
            }
    }
    return state;
}
export default starInfoReducer;