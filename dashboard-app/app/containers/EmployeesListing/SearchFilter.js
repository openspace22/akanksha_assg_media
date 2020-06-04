import React,{ useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core";
import queryString from "query-string";
import ClearIcon from '@material-ui/icons/Clear';
const useStyles = makeStyles((theme)=>({
    ulRoot: {
        position: "absolute",
        left: 0,
        right: 0,
        top: "100%",
        background: "white",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        boxShadow: "-1px 3px 6px rgba(0,0,0,.14)"
    },
    selectedItem: {
        background: "#d2d2d2"
    },
    searchInputHolder: {
        position: "relative"
    },
    filterHolder: {
        display: "inline-block",
        borderRadius: "10px",
        background: "#d2d2d2",
        padding: "5px",
        textTransform: "capitalize",
        color: "#fff",
        marginTop: "5px",
       
        "&:not(:first-child)":{
            marginLeft: "5px"
        }
    }
}))
const SearchFilter = ({
    list,
    history,
    location
}) => {
    const [showFilter,toggleFilterChoices] = useState(false);
    const [selectedFilterIndex,setSelectedFilterIndex] = useState(-1);
    const [searchVal, setSearchVal] = useState("");
    const classes = useStyles();
    const [searchParams, setSearchParams] = useState(()=>{
        return queryString.parse(location.search);
    });
    useEffect(()=>{
        setSearchParams(queryString.parse(location.search))
    },[location]);
    const addFilterParams = (key) => {
        const newSearchParams = {
            ...searchParams,
            [key]: searchVal
        }
        setSearchParams(newSearchParams);
        setSearchVal("");
        showHideFilterChoices(false);
        history.push(location.pathname + "?" + queryString.stringify(newSearchParams));
    }
    const removeFilterParams = (key) => {
        const { [key]: deleted,...newSearchParams} = searchParams ;
        setSearchParams(newSearchParams);
        history.push(location.pathname + "?" + queryString.stringify(newSearchParams));
    }
    
    const onKeyDown = (e)=>{
        if(!showFilter){
            return;
        }
        const keyCode =  e.keyCode || e.which;
        if(keyCode == 38){
            setSelectedFilterIndex((lastIndex)=>{
                return Math.max(--lastIndex,0);
            })
        }else if(keyCode == 40){
            setSelectedFilterIndex((lastIndex)=>{
                return Math.min(++lastIndex,list.length - 1);
            })
        }else if(keyCode == 13){
            addFilterParams(list[selectedFilterIndex].searchKey);
        }
    }
    const showHideFilterChoices = (status) => {
        toggleFilterChoices(status);
        setSelectedFilterIndex(status ? 0 : -1);
    }
    return (
        <div>
            <div className={classes.searchInputHolder}>
                <form autoComplete="off" onSubmit={(e)=>{
                    e.preventDefault();
                }}>
                    <TextField 
                        id="standard-basic"  
                        fullWidth={true} 
                        value={searchVal}
                        onKeyDown={onKeyDown}
                        onFocus={
                            () => {
                                showHideFilterChoices(searchVal.length >= 2);
                            }
                        }
                        onChange={
                            (e)=>{
                                setSearchVal(e.target.value);
                                if(e.target.value.length > 1){
                                    showHideFilterChoices(true)
                                }
                            }
                        }
                        onBlur={
                            ()=>{
                                showHideFilterChoices(false);
                            }
                        }
                        label="Search Employee"
                        ></TextField>
                </form>
                { showFilter ? (
                    <List 
                        classes={
                            {
                                root: classes.ulRoot
                            }
                        }
                    >
                        {
                            list.map((item,index)=>(
                                <ListItem button classes={selectedFilterIndex == index ? {
                                    root: classes.selectedItem
                                } : null} onMouseDown={()=>{
                                    addFilterParams(item.searchKey)
                                }} key={item.title}>
                                    <ListItemText>Search by {item.title}</ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                    ) : null
                }
            </div>
            <div style={
                {
                    minHeight: "20px"
                }
            }>  
                {
                    Object.keys(searchParams).map((key)=>{
                        return (
                            <div className={classes.filterHolder} key={key}>
                                <span>{key}: </span>
                                <span style={{marginLeft: "5px"}}>{searchParams[key]}</span>
                                <ClearIcon onClick={()=>{
                                    removeFilterParams(key);
                                }}></ClearIcon>
                            </div>
                        )
                    })
                }
                
            </div>
            
        </div>
    );
}

export default withRouter(SearchFilter);