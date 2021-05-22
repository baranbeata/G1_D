import React from "react";
import { useLocation } from "react-router-dom";

const ProductDetails = _ => {
    const { state } = useLocation();

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>Product details page</strong>
                </h3>
            </header>

            <p>
                <strong>Name:</strong> {state.products.name}
            </p>
            <p>
                <strong>Size:</strong> {state.products.size}
            </p>
            <p>
                <strong>Category:</strong> {state.products.categories.name}
            </p>
            <p>
                <strong>Type:</strong> {state.products.types.name}
            </p>
            <p>
                <strong>Price:</strong> {state.products.price}
            </p>
            <p>
                <strong>Description:</strong> {state.products.description}
            </p>
        </div>
    );
};

export default  ProductDetails ;
