import React from "react";
import ListingCard from "../ListingCard";
import "./style.scss";
const ListingCardHolder = ({
    list,
    prepareHeader,
    prepareBody,
    prepareFooter,
    noOfCardPerRow = 3
}) => {
    const prepareCards = () => {
        const cardElement = [];
        for(let index = 0;index < list.length;index = index + noOfCardPerRow) {
            const cardsToPrepare = list.slice(index, index + noOfCardPerRow);
            cardElement.push(
                <div key={index} style={
                    {
                        width: "100%",
                        display: "flex"
                        
                    }
                }>
                    {
                        cardsToPrepare.map((item,key)=>{
                            const header = prepareHeader(item);
                            const body = prepareBody(item);
                            const footer = prepareFooter(item);
                            return (
                                <div 
                                    className="card-wrapper" 
                                    key={key}
                                    style={{
                                        width: `calc( 100% / ${noOfCardPerRow} )`
                                    }
                                }>
                                    <ListingCard 
                                        header={header}
                                        body={body}
                                        footer={footer}
                                    ></ListingCard>
                                </div>
                            )
                        })
                    }
                
                </div>
            );
            
        }
        return cardElement;
    } 
    return (
        <div className="listing-card-holder">
            {
                prepareCards()
            }
            
        </div>
    )
}

export default ListingCardHolder;