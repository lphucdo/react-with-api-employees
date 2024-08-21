//components/UserCartComponent.js
 
import React, { useState } from 'react';
import swal from 'sweetalert';
import OrderService from '../services/OrderService';
import EmployeeService from '../services/EmployeeService';
 
function UserCartComponent({
    cartProduct,
    deleteProductFromCartFunction,
    totalAmountCalculationFunction,
    setCartProduct,
}) {
    const [token, setToken] = useState(EmployeeService.getToken());

    // nhận cartCourse là danh sách sản phẩm
    // hàm delete theo từng cart và tổng tiền
    // cái set Cartcourse nữa
    const addOrders = () => {

        const data = cartProduct.map((item)=>{
                return {...item, price: item.product.price}
            }
        );
        OrderService.addOrder(data, token);
        console.log(data);
        swal("Thanh Cong", "Them Order Thanh Cong" , "success")
    }
return (
<div className={`cart ${cartProduct.length > 0 ? 'active' : ''}`}>
    {/* kiểm tra xem cartCourse.length có sản phẩm nào không */}
    <h2>My Cart</h2>
    {cartProduct.length === 0 ? (
    <p className="empty-cart">Geek, your cart is empty.</p>
    ) : (
<div>
    <ul>
        {/* Nếu có sẽ dùng hàm map in ra các sản phẩm. cùng với các hàm tương ứng 
            (ĐÃ DÙNG HÀM FILTER ĐỂ XEM CÁI NÀO KHÔNG GIỐNG VỚI ITEM NÀY THÌ ĐƯỢC TRUYỀN VÀO ARRAY MỚI)
        */}
        {cartProduct.map((item) => (
            
            <li key={item.product.id} className="cart-item">
                <div>
                    <div className="item-info">
                        <div className="item-image">
                            <img src={item.product.image} 
                                 alt={item.product.productName} />
                        </div>
                        <div className="item-details">
                            <h3>{item.product.productName}</h3>
                            <p>Price: ₹{item.product.price}</p>
                        </div>
                    </div>
                    <div>
                        <div className="item-actions">
                            <button
                                className="remove-button"
                                onClick={() => 
                                deleteProductFromCartFunction(item.product)}>
                                Remove Product
                            </button>
                            <div className="quantity">
                                <button style={{ margin: "1%" }} 
                                    onClick={(e) => {
                                    setCartProduct((prevCartProduct) => {
                                        const updatedCart = prevCartProduct.map(
                                        (prevItem) =>
                                          prevItem.product.id === item.product.id
                                                ? { ...prevItem, quantity: 
                                                    item.quantity + 1 }
                                                : prevItem
                                        );
                                        return updatedCart;
                                    })
                                    // Kiểm tra sản phẩm có trong giỏ hàng không qua id nếu giống thì viết lại object
                                    // và thêm quantity: ite,.quantity+1
                                }}>+</button>
                                <p className='quant'>{item.quantity} </p>

                                <button 
                                    onClick={(e) => {
                                    setCartProduct((prevCartProduct) => {
                                        const updatedCart = prevCartProduct.map(
                                        (prevItem) =>
                                        prevItem.product.id === item.product.id
                                                ? { ...prevItem, quantity:
                                                Math.max(item.quantity - 1, 0) }
                                                : prevItem
                                        );
                                        return updatedCart;
                                    })
                                }}>-</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
    <div className="checkout-section">
        <div className="checkout-total">
            <p className="total">Total Amount: 
                ₹{totalAmountCalculationFunction()}
            </p>
        </div>
        <button
            className="checkout-button"
            disabled={cartProduct.length === 0 || 
            totalAmountCalculationFunction() === 0}

            onClick={(e)=>{addOrders()}}
        >
            Proceed to Payment
        </button>
    </div>
</div>
            )}
</div>
    );
}
 
export default UserCartComponent;