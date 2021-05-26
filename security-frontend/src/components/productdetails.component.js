import React from "react";
import { useLocation } from "react-router-dom";

const ProductDetails = _ => {
    const { state } = useLocation();

    return (
        <div className="container">
                <header style={{ paddingTop: "50px"}}>
                    <h2 style={{ fontFamily: "Corbel Light", color: 'rgb(207,16,26)'}}>
                        PRODUCT DETAILS
                    </h2>
                </header>

<div>
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
            <div>
                <img src={process.env.PUBLIC_URL + "/img/product/product-1.jpg"} alt="image" />
            </div>
        </div>
    );
};

export default  ProductDetails ;
