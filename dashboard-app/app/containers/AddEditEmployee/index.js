import React,{ useEffect, useState } from "react";
import { Field, reduxForm, FieldArray } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from "../../components/Header";
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from "./saga";
import reducer from "./reducer";
import {
    saveEmployee,
    loadEmployeeData,
    editEmployee,
    loadDefaultState
} from "./actions";
import "./style.scss";
import { makeStyles } from "@material-ui/core";
import {
    selectEmployeeInfo
} from "./selector";
import { connect } from "react-redux";

const key = "addEditEmployee";
const NAME_REGEX = /^[a-z A-Z ,.'-]*$/;
const SALARY_REGEX = /^\d{1,7}(?:\.\d{0,2})?$/;
const ADDRESS_REGEX = /^[A-Za-z0-9&,\s]+$/;
const MOBILE_REGEX = /^[789][0-9]{0,9}$/;
const ONLY_NUMBER_REGEX = /^\d{0,}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const useStyles = makeStyles((theme) => ({
    inputRoot: {
        width: "100%",
        "& .MuiFormLabel-root": {
            fontSize: ".875rem",
            "&.Mui-focused": {
                color: "#9c27b0"
            },
            "&.Mui-error": {
                color: "#c23b22"
            }
        },
        "& .MuiInput-underline.Mui-error:after": {
            borderColor: "#c23b22"
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before":{
            borderColor: "#9c27b0"
        },
        "& .MuiFormHelperText-root.Mui-error":{
            color: "#c23b22"
        },
        "& .MuiInput-underline:after":{
            borderColor: "#9c27b0"
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "#d2d2d2"
        },
        "& textarea":{
            resize: "none"
        }
    }
}));

// const isNameValid = (value) => !!value;
const checkRequiredFields = (values)=>{
    const errors = {};
    const filedsRequired = [
        "firstName",
        "lastName",
        "email",
        "salary",
        "address",
        "mobileNo",
        "age"
    ];
    filedsRequired.forEach((fieldKey)=>{
        if(values[fieldKey] == undefined || values[fieldKey] == ""){
            errors[fieldKey] = fieldKey + " is required";
        }
    });

    return errors;
}
const validate = (values) => {
    const errors = {};
    const errorFieldsErr = checkRequiredFields(values);
    if((Number(values.salary) < 1000000 
         || Number(values.salary) > 2000000)){
            errors.salary = "Salary must lie between 1000000 and 2000000";
    }
    if(values.mobileNo && values.mobileNo.length != 10){
        errors.mobileNo = "Invalid Mobile No.";  
    }
    if(values.about && values.about.length < 15){
        errors.about = "Must have atleast 15 charaters long";
    }
    if(values.age && (Number(values.age) < 20 || Number(values.age) > 40)){
        errors.age = "Must be between 20 and 40";
    }
    if(values.email && !checkRegex(EMAIL_REGEX,values.email)){
        errors.email = "Invalid Email";
    }
    return {...errors,...errorFieldsErr};
}
const checkRegex = (regex,value) => {
 if(value !== undefined && value !== ""){
     return regex.test(value);
 }   
 return true;
}
const renderInput = ({
    input,
    label,
    meta: { touched, error},
    ...extraProps
}) => {
    const classes = useStyles();
    return (
        <TextField 
            classes={
                {
                    root: classes.inputRoot
                }
            }
            error={touched && !!error}
            helperText={touched && error}
            label={label}
            {...input}
            {...extraProps}
        ></TextField>
    )
}
const renderDependents = (dependent,index,fields)=>{
    return (
        <div className="col-50" key={index}>
            <Field 
                name={`${dependent}.name`} 
                component={renderInput} 
                type="text" 
                onChange={
                    (e)=>{
                        if(!checkRegex(NAME_REGEX,e.target.value)){
                            e.preventDefault();
                        }
                    }
                }
                autoFocus={index == fields.length -1}
            />
            <DeleteIcon 
                className="icon-trash-style"
                onClick={()=>{
                    fields.remove(index)
                }}
            ></DeleteIcon>
        </div>
         
    )
}
const renderAddDependentSec = ({
    fields
}) => {
    return (
        <>
            <InputLabel
                shrink={true}
                classes={
                    {
                        root: "col-100"
                    }
                }
            >
                Dependents
            </InputLabel>
            <div className="form-row">
                {fields.map(renderDependents)}
            </div>
            {
                fields.length < 2 ? 
                    (
                        <div className="col-100">
                            <button
                                className="btn add-btn" 
                                type="button" 
                                onClick={()=>{
                                        fields.push({})
                                    }
                                }
                            >
                                <AddIcon></AddIcon>
                                Add Dependent
                            </button>
                        </div>
                    ) : null
            }
        </>
    )
}
let AddEditEmployee = (props) => {
    const { handleSubmit } = props;
    useInjectReducer({key,reducer});
    useInjectSaga({key,saga});
    useEffect(()=>{
        const employeeId = props.match.params.id;
        if(employeeId){
            props.loadEmployeeData(employeeId);
        }else{
            props.loadDefaultState();
        }
    },[location.pathname])
    return (
        <div className="page-body">
            <Header title="Add Employee"></Header>
            <div className="form-wrapper">
                <form 
                    onSubmit={handleSubmit((values)=>{
                        if(values.id){
                            props.editEmployee(values)
                        }else{
                            props.saveEmployee(values);
                        }
                    })} 
                    autoComplete="off" 
                    className="form-table"
                >
                    <div className="form-row">
                        <div className="col-50">
                            <Field 
                                name="firstName" 
                                component={renderInput} 
                                label="First Name" 
                                type="text" 
                                onChange={
                                    (e)=>{
                                        if(!checkRegex(NAME_REGEX,e.target.value)){
                                            e.preventDefault();
                                        }
                                    }
                                }
                                autoFocus={true}
                            />
                        </div>
                        <div className="col-50">
                            <Field 
                                name="lastName" 
                                component={renderInput} 
                                label="Last Name" 
                                type="text"
                                onChange={
                                    (e)=>{
                                        if(!checkRegex(NAME_REGEX,e.target.value)){
                                            e.preventDefault();
                                        }
                                    }
                                } 
                            />
                        </div>
                    </div>
                   <div className="form-row">
                    <div className="col-50">
                            <Field 
                                name="email" 
                                component={renderInput} 
                                label="Email" 
                                type="text" 
                            />
                        </div>
                        <div className="col-50">
                            <Field 
                                name="mobileNo" 
                                component={renderInput}  
                                type="text"
                                inputProps={
                                    {
                                        placeholder: "Mobile No"
                                    }
                                }
                                InputProps={
                                    {
                                        className: "mobile-input"
                                    }
                                }
                                onChange={
                                    (e)=>{
                                        if(!checkRegex(MOBILE_REGEX,e.target.value)){
                                            e.preventDefault();
                                        }
                                    }
                                }
                            />
                            <div className="country-label">+91</div>
                        </div>
                        
                   </div>
                   <div className="form-row">
                        <div className="col-100">
                            <Field 
                                name="address" 
                                component={renderInput} 
                                label="Address" 
                                type="text"
                                onChange={
                                    (e)=>{
                                        if(!checkRegex(ADDRESS_REGEX,e.target.value)){
                                            e.preventDefault();
                                        }
                                    }
                                }
                            />
                        </div>
                   </div>
                   <div className="form-row">
                        <div className="col-50">
                            <Field 
                                name="salary" 
                                component={renderInput} 
                                label="Salary" 
                                type="text" 
                                onChange = {
                                    (e)=>{
                                        if(!checkRegex(SALARY_REGEX,e.target.value)){
                                            e.preventDefault();
                                        }
                                    }
                                }
                            />
                        </div>
                        <div className="col-50">
                            <Field 
                                name="age" 
                                component={renderInput} 
                                label="Age" 
                                type="text" 
                                onChange={
                                    (e) => {
                                        if(!checkRegex(ONLY_NUMBER_REGEX,e.target.value)){
                                            e.preventDefault();
                                        }
                                    }
                                }
                            />
                        </div>
                   </div>
                   <div className="form-row">
                        <div className="col-100">
                            <Field 
                                name="about"
                                label="About"
                                InputLabelProps={
                                    {
                                        disableAnimation: true,
                                        shrink: true
                                    }
                                } 
                                multiline
                                rows={2}
                                rowsMax={7}
                                component={renderInput} 
                                type="text" 
                            />
                        </div>
                   </div>
                   <div className="form-row dependent-row">
                       <FieldArray 
                            name="dependants" 
                            component={renderAddDependentSec}
                        >
                        </FieldArray>
                   </div>
                    <button type="submit" className="submit-btn btn">Submit</button>
                </form>
            </div>
            
        </div>
    );
}
const mapStateToProps = (state) => ({
    initialValues: selectEmployeeInfo(state)
})
AddEditEmployee = reduxForm({
    form: "addEmpForm",
    validate,
    enableReinitialize : true
})(AddEditEmployee);

AddEditEmployee = connect(mapStateToProps,{
    saveEmployee,
    loadEmployeeData,
    editEmployee,
    loadDefaultState
})(AddEditEmployee);

export default AddEditEmployee;