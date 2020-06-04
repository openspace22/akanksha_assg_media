import React, { useMemo } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import "./style.scss";
import { makeStyles } from "@material-ui/core";
let selectIndex = 0;
const useStyles = makeStyles((theme) => {
    return{
        root: {
            width: "50%",
            "&:before": {
                borderColor: `#d2d2d2`,
                
            },
            "&:hover:not(.Mui-disabled):before": {
                borderColor: "#9c27b0"
            }
        },
        select: {
            background: "transparent",
            color: (props) => props.themeColor,
            width: "100%",
            textTransform: "capitalize",
            boxSizing: "border-box",
        },
        icon: {
            color: (props) => props.themeColor
        },
    }
    
});
export default function DropDown({
    list,
    onChange,
    value,
    placeHolder,
    dropDownLabel,
    inputProps
}){
    const uniqueIndex =  useMemo(()=>++selectIndex,[]);
    const styles = useStyles({
        themeColor: "#333"
    });
    const defaultInputProps = {
        id: `id-${uniqueIndex}`,
        name: `name-${uniqueIndex}`,
    }
    return(
        <div className="drop-down-holder">
            <InputLabel
                classes={{
                    root: "form-label"
                }} 
                id={`select-label-${uniqueIndex}`}
            >
                {dropDownLabel}
            </InputLabel>
            <Select
                labelId={`select-label-${uniqueIndex}`}
                value={value} 
                onChange={onChange} 
                className={styles.root}
                displayEmpty
                inputProps={{...defaultInputProps,...inputProps}}
                classes={{
                    select: styles.select,
                    icon: styles.icon
                }}
                MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left"
                    }
                }}
                >
                    {placeHolder ? <MenuItem value="" disabled>{placeHolder}</MenuItem> : null}
                {
                    list.map((item,index) => {
                        const {key, value} = item;
                        return <MenuItem key={index} value={key}>{value}</MenuItem>
                    })
                }
            </Select>
        </div>
        
    )
}