//components/ShowCourseComponent.js
import React from 'react';
 
function ShowProductComponent({ product, 
    filterProductFunction, 
    addProductToCartFunction }) {
    return (
        <div className="product-list">
            {filterProductFunction.length === 0 ? (
                // kiểm tra giá trị filterCourseFunction.length xem có độ dài để xem có cái giá trị gì không
                <p className="no-results">
                    Sorry Geek, No matching Product found.
                </p>
            ) : (
                // nếu có thì map các sản phẩm trùng tên với filterCourseFunction
                filterProductFunction.map((product) => (
                    <div className="product" key={product.id}>
                        <img src={product.image} alt={product.productName} />
                        <h2>{product.productName}</h2>
                        <p>Price: ₹{product.price}</p>
                        <button
                            className="add-to-cart-button"
                            onClick={() => addProductToCartFunction(product)}
                        >
                            Add to Shopping Cart
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
 
export default ShowProductComponent;