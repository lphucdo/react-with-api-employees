import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import ProductService from "../services/ProductService";
import SearchComponent from "../components/SearchComponent";
import UserCartComponent from "../components/UserCartComponent";
import ShowProductComponent from "./ShowProductComponent";

function ViewProduct() {
    const token = localStorage.getItem("token");
    const [product, setProduct] = useState([]);
    const [cartProduct, setCartProduct] = useState([]);
    const [searchProduct, setSearchProduct] = useState("");
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await ProductService.getAllProduct(token);
            console.log(response.listProduct);
            setProduct(response.listProduct);
        } catch (error) {
            setProduct([]);
            swal("success", "San pham hien tai dang trong", "")
        }
    };

    const addProductToCartFunction = (newProduct) => {
        const alreadyProduct = cartProduct.find((item) => item.product.id === newProduct.id);

        if (alreadyProduct) {
            const latestCartUpdate = cartProduct.map((item) =>
                item.product.id === newProduct.id
                    ? { ...item, quantity: item.quantity + 1}
                    : {...item}
            );
            setCartProduct(latestCartUpdate);
        } else {
            setCartProduct([...cartProduct, { product: newProduct, quantity: 1 }]);
        }

        
    };

    const deleteProductFromCartFunction = (productDelete) => {
        const updatedCart = cartProduct.filter((item) => item.product.id !== productDelete.id);
        setCartProduct(updatedCart);
    };

    const totalAmountCalculationFunction = () => {
        return cartProduct.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    };

    const productSearchUserFunction = (event) => {
        setSearchProduct(event.target.value);
    };

    const filterProductFunction = product.filter((prod) =>
        prod.productName.toLowerCase().includes(searchProduct.toLowerCase())
    );

    return (
        <div className="App">
            <SearchComponent
                searchProduct={searchProduct}
                productSearchUserFunction={productSearchUserFunction}
            />
            <h4>
                <button className="btn btn-danger btn-sm float-end" onClick={()=>setShowCart(!showCart)}>
                    {showCart ? "Ẩn Giỏ Hàng" : "Giỏ Hàng Của Tôi"}
                </button>
            </h4>
            <main className="App-main">
                <ShowProductComponent
                    product={product}
                    filterProductFunction={filterProductFunction}
                    addProductToCartFunction={addProductToCartFunction}
                />
                {showCart && <UserCartComponent
                    cartProduct={cartProduct}
                    deleteProductFromCartFunction={deleteProductFromCartFunction}
                    totalAmountCalculationFunction={totalAmountCalculationFunction}
                    setCartProduct={setCartProduct}
                ></UserCartComponent>}
            </main>
        </div>
    );
}

export default ViewProduct;
