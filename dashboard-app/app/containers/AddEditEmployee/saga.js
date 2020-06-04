import { takeLatest, call, put } from "redux-saga/effects";
import {
    CREATE_EMPLOYEE_DATA,
    LOAD_EMPLOYEE_DATA,
    EDIT_EMPLOYEE_DATA
} from "./constants";
import {
    onLoadEmployeeData
} from "./actions";
import request from "../../utils/request";
import { push } from 'connected-react-router';
function getEmployeeWrapper(data){
    return {
        "first_name": data.firstName,
        "last_name": data.lastName,
        "age": data.age,
        "email": data.email,
        "salary": data.salary,
        "address": data.address,
        "phone": `${data.mobileNo}`,
        "about": data.about || "",
        "dependants": data.dependants || null
    }
}
function* createEmployee({data}){
    const dataToSend = getEmployeeWrapper(data);
    const response = request("http://localhost:3004/employee",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    });
    yield put(push("/employee/listing"));
}
function* editEmployee({data}){
    const dataToSend = getEmployeeWrapper(data);
    const response = request(`http://localhost:3004/employee/${data.id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    });
    yield put(push("/employee/listing"));
}
function* fetchEmployeeData({id}){
   const data = yield call(request,`http://localhost:3004/employee?id=${id}`) ;
   console.log("saga called");
   if(data && data[0]){
       const empData = data[0];
       const formData = {
        id: empData.id,
        "firstName": empData.first_name,
        "lastName": empData.last_name,
        "age": empData.age.toString(),
        "email": empData.email,
        "salary": empData.salary.toString(),
        "address": empData.address,
        "mobileNo": empData.phone,
        "about": empData.about || "",
        "dependants": empData.dependants || null
       }
        yield put(onLoadEmployeeData(formData));
   }
}
export default function* employeeInfoSaga(){
    yield takeLatest(LOAD_EMPLOYEE_DATA,fetchEmployeeData);
    yield takeLatest(CREATE_EMPLOYEE_DATA,createEmployee);
    yield takeLatest(EDIT_EMPLOYEE_DATA,editEmployee);
}