import React, { useState, useEffect } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import list from "./leftMenu";
import "./style.scss";
const useStyles = makeStyles((theme)=>({
    root:{
        width: "250px",
    },
    paper: {
        width: "250px",
        background: "#ffffff",
        color: "#3c4858",
        "& .MuiListItemIcon-root": {
            color: "#a9afbb"
        },
        "& svg":{
            color: "#a9afbb"
        }
    },
    nested:{
        paddingLeft: ({level})=>`${level*16}px`
    }
}))

const SideBar = (props) => {
    const classes = useStyles();
    return (
        <Drawer 
            open={true}
            className="side-panel"
            classes={
                {
                    paper: classes.paper,
                    root: classes.root
                }
            }
            disableScrollLock={true}
            ModalProps={{
                hideBackdrop: true,
                disableAutoFocus: true,
                disableEnforceFocus: true
            }}
        >
            <div className="sidebar-header">
                <div className="logo">MS</div>
                <div>My Assignments</div>
            </div>
            <MenuList list={list} {...props}></MenuList>
        </Drawer>
    )
}
const MenuList = ({
    list,
    level = 1,
    ...restProps
}) => {
    const [menuState,setMenuState] = useState({});
    const handleClick = (title) => {
        setMenuState((oldMenuState)=> {
            return {
                ...oldMenuState,
                [title]: !oldMenuState[title]
            }
        });
    }
    useEffect(()=>{
        function isActive(item,location){
            if(item.isActive){
                return item.isActive(location);
            }else{
                return item.href == location.pathname
            }
        }
        const newState = list.reduce((acc,item)=>{
            let selectedChild = null;
            if(item.child){
                //if any of the child selected
                selectedChild = (item.child.filter((child)=>isActive(child,location)).length > 0)
            }else{
                selectedChild =  isActive(item,location);
            }
            acc[item.title] = selectedChild ? true : false;
            return acc;
        },{});
        setMenuState(newState);
    },[location.pathname]);
    
    const classes = useStyles({
        level
    });
    const renderChild = (item) => {
        let child = null;
        const Icon = item.Icon;
        const iconEle = Icon ? <Icon></Icon> : null; 
        if(item.child){
            child = (
                <>
                    <ListItem 
                        key={item.title} 
                        className={classes.nested} button 
                        onClick={()=>{
                            handleClick(item.title)
                        }}
                    >
                        <ListItemIcon 
                            classes={{
                                root: "icon-root"
                            }}
                        >
                            {iconEle}
                        </ListItemIcon>
                        <ListItemText primary={item.title}></ListItemText>
                        {
                            menuState[item.title] ? <ExpandLess /> : <ExpandMore />
                        }
                    </ListItem>
                    <Collapse in={menuState[item.title]} timeout="auto" unmountOnExit>
                        <List>
                            <MenuList list={item.child} level={level+1} {...restProps}></MenuList>
                        </List>
                    </Collapse>
                </>
            )
        }else{
            child = (
                <ListItem key={item.title} className={`${classes.nested}`} button>
                    <Link 
                        to={item.href} 
                        className={`nav-link ${menuState[item.title] ? 'active' : ""}`} 
                    >
                        <ListItemIcon 
                            classes={{
                                root: "icon-root"
                            }}
                        >
                            {iconEle}
                        </ListItemIcon>
                        <ListItemText primary={item.title}></ListItemText>
                    </Link>
                </ListItem>
            )
        }
        return child;
    }
    return (
        list.map((item)=>{
            return (
                <div key={item.title}>
                    { renderChild(item) }
                </div>
            )
        })
    )
}
export default withRouter(SideBar);