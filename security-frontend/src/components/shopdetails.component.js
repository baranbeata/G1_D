import React, { Component } from "react";
import { useLocation, Link } from "react-router-dom";

const ShopDetails = _ => {
    const { state } = useLocation();

    return (
        <div className="container">
                <header style={{ paddingTop: "50px", marginBottom: "50px"}}>
                    <h2 style={{ fontFamily: "Corbel Light", color: 'rgb(207,16,26)'}}>
                        SHOP DETAILS
                    </h2>
                </header>

            <p>
                <strong>Name:</strong> {state.shops.name}
            </p>
            <p>
                <strong>Address:</strong> {state.shops.address}
            </p>
            <p>
                <strong>City:</strong> {state.shops.city}
            </p>
            <p>
                <strong>Open hours:</strong> {state.shops.hours}
            </p>

        </div>
    );
};

export default  ShopDetails ;
