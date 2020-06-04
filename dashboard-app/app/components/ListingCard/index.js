import React from "react";
import "./style.scss";
const ListingCard = ({
    header,
    body,
    footer
}) => {
    return (
        <>
            <div className="listing-card">
                <div className="header">
                    {header}
                </div>
                <div className="body">
                    {body}
                </div>
                <div className="footer">
                    {footer}
                </div>
            </div>
        </>
    )
}
export default ListingCard;