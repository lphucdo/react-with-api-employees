import React,{useState} from "react";
import CartService from "../services/CartService";
import swal from "sweetalert";

function Cart({cart,index}){
    const token = localStorage.getItem('token');
    const deleteCart = async (e,id) => {
        const thisClicked = e.currentTarget;
        try {
            thisClicked.innerText = "Deleting"
            const response = CartService.deleteCartByIdCart(id,token);
            swal("Successfully!" , response.message ? response.message : "Xoa" , "success");
            thisClicked.closest("tr").remove()
        } catch (error) {
            console.log(error);
            swal("Failed" , "Xoa That Bai" , "error");

        }
    }

    return(
        <tr key={index}>
            <td>{cart.id}</td>
            <td>{cart.product.productName}</td>
            <td>{cart.product.description}</td>
            <td>{cart.product.price}</td>
            <td>{cart.quantity}</td>
            <td>{cart.employee.username}</td>
            <td>{cart.product.price * cart.quantity}</td>

            <td>
                <button type="button" onClick={(e) => deleteCart(e,cart.id)} className="btn btn-danger btn-sm"> Delete</button>
            </td>
        </tr>
    )
}

export default Cart;