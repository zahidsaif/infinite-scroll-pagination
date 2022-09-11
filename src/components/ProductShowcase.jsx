import React from "react";

const ProductShowcase = ({ productName, productImage }) => {
    return <>
        <img className={"product-image"} src={productImage} alt={productName} />
        <h3 className={"product-name"}>{productName}</h3>
    </>
}

export default ProductShowcase