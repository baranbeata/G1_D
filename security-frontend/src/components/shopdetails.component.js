import React, { Component } from "react";
import { useLocation, Link } from "react-router-dom";

const ShopDetails = _ => {
    const { state } = useLocation();

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>Shop details page</strong>
                </h3>
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
