import React, { useState, useImperativeHandle, Fragment } from "react";
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
    primary: {
        fontSize: ".825rem"
    },
    popoverPaper: {
        minWidth: "10rem"
    },
    listItemRoot: {
        padding: ".625rem 1.5rem"
    },
    listRoot: {
        padding: "5px 0px"
    }
}));
const ListPopover = React.forwardRef(({
    lisItems,
    clickTarget,
    popoverClasses,
    listItemClasses,
    anchorOrigin,
    transformOrigin
},ref)=>{
    const [anchorEl,setAnchorEl] = useState(null);
    const classes = useStyles();
    const handleClose = () => {
        setAnchorEl(null);
    }
    useImperativeHandle(ref,()=>({
        handleClose
    }))
    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget);
        if(clickTarget.props.onClick){
            clickTarget.props.onClick();
        }
    };
    const prepareListData = () => {
        const list = [];
        let listItems = [];
        lisItems.forEach((item)=>{
            if(item.type == "ListItem"){
                listItems.push(
                    <ListItem button 
                        classes={
                            {
                                root: classes.listItemRoot,
                                ...listItemClasses
                            }
                        }
                        key={item.title}
                        onClick={()=>{
                           if(item.onClick){
                               item.onClick();
                           } 
                           handleClose();
                        }}
                    >
                        <ListItemText  
                            classes={{
                                primary: classes.primary
                            }}
                            
                            primary={item.title}
                        >

                        </ListItemText>
                    </ListItem>
                )
            }else if(item.type == "Divider"){
                list.push(
                    <Fragment key={list.length + 1}>
                        <List 
                            classes={
                                {
                                    root: classes.listRoot
                                }
                            }
                        >
                            {listItems}
                            <div></div>
                        </List>
                        <Divider></Divider>
                    </Fragment>
                    
                );
                listItems = [];
            }
        });
        if(listItems.length){
            list.push(
                <List key={list.length + 1}>
                    {listItems}
                </List>
            )
        }
        return list;
    }
    
    const open = Boolean(anchorEl);
    return (
        <>
            
               { React.cloneElement(clickTarget,{ onClick: handleClick }) }
               <Popover 
                open={open} 
                anchorEl={anchorEl}
                classes={
                    {
                        paper: classes.popoverPaper,
                        ...popoverClasses
                    }
                }
                onClose={handleClose}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            >
                {
                        prepareListData()
                }
            </Popover>
        </>
    )
})
ListPopover.defaultProps = {
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
    }
}
export default ListPopover;