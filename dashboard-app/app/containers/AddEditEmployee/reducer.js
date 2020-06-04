import {
    LOAD_EMPLOYEE_SUCCESS,
    LOAD_DEFAULT_STATE
} from "./constants";
export const initialState = {
    employeeInfo: {
        // firstName: "",
        // lastName: "",
        // age: "",
        // email: "",
        // salary: "",
        // address: "",
        // phone: "",
        // about: ""
    }
} 

const addEditEmployeeReducer = (state = initialState,{type, data}) => {
    switch(type){
        case LOAD_EMPLOYEE_SUCCESS: {
            return {
                ...state,
                employeeInfo: {
                    ...data
                }
            };
        }
        case LOAD_DEFAULT_STATE: {
            return {
                ...state,
                employeeInfo: {
                    ...initialState
                }
            }
        }
    }
    return state;
}

export default addEditEmployeeReducer;