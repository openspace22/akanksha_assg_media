import {
    CREATE_EMPLOYEE_DATA,
    EDIT_EMPLOYEE_DATA,
    LOAD_EMPLOYEE_DATA,
    LOAD_EMPLOYEE_SUCCESS,
    LOAD_DEFAULT_STATE
} from "./constants";
export const saveEmployee = (data) => ({
    type: CREATE_EMPLOYEE_DATA,
    data
});

export const loadEmployeeData = (id) => ({
    type: LOAD_EMPLOYEE_DATA,
    id
});

export const onLoadEmployeeData =(data) => ({
    type: LOAD_EMPLOYEE_SUCCESS,
    data
});

export const editEmployee = (data) => ({
    type: EDIT_EMPLOYEE_DATA,
    data
});

export const loadDefaultState = () => ({
    type: LOAD_DEFAULT_STATE
})
