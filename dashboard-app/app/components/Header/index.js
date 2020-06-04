import React, { useRef, useMemo } from "react";
import ListPopover from "../ListPopover";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import "./style.scss";
const Header = ({
    title = ""
}) => {
    const popOverRef = useRef(null);
    const listOptions = useMemo(()=>(
        [
            {
                type: "ListItem",
                title: "Profile"
            },
            {
                type: "ListItem",
                title: "Settings"
            },
            {
                type: "Divider"
            },
            {
                type: "ListItem",
                title: "Logout"
            }
        ]

    ),[popOverRef]);
    return (
        <div className="page-header">
            <div>{title}</div>
            <ListPopover
                ref={popOverRef}
                lisItems= {listOptions}
                clickTarget={(
                    <div 
                        className="profile-icon"
                    >
                        <AccountCircleIcon></AccountCircleIcon>
                    </div>
                )}
            >
            </ListPopover>
            
        </div>
    )
}
export default Header;