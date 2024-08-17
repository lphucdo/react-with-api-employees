import React,{useState} from "react";
import OrderService from "../services/OrderService";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import ProductService from "../services/ProductService";
function QuantityInput({prod,index,isAdmin}){

    const [quantity,setQuantity] = useState(1);
    const token = localStorage.getItem('token');
    const addToCart= async (id) => {
        var confirm = window.confirm("Add to your cart? ");
        
        if(confirm){
            const payload = {
                productId: id,
                quantity: quantity
            }
            try {
                const response = await OrderService.addCart(payload , token);
                swal("Successfully", response.message ? response.message : "Them thanh cong" , "success");
            } catch (error) {
                throw error;
            }
        }
    }
    const deleteProduct = async (e, id) => {
        const thisClicked = e.currentTarget;
        try {
            const response = await ProductService.deleteProductById(id, token);
            swal("Successfully", response.message ? response.message : "Ok" , "success");
            thisClicked.closest("tr").remove();
        } catch (error) {
            swal("Failed" , "Xoa That Bai" , "error");
            throw error;
        }
    }
    const updateQuantity = async (e) => {
        e.preventDefault();
        window.confirm("Đang phát triển phong cách.")
        // try {
        //     const data = {
        //         quantity: prod.quantity
        //     }
        // } catch (error) {
            
        // }
    }

    return (
        <tr key={index}>
            <td>{prod.id}</td>
            <td>{prod.productName}</td>
            <td>{prod.description}</td>
            <td>{prod.price}</td>
            <td className="text-center">
            <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                min={1} max={prod.quantity} value={isAdmin ===true ? prod.quantity : quantity} 
                onChange={(e)=>setQuantity(e.target.value)}
                className="form-control form-control-sm w-100"
                >
                
            </input></td>

            {
                isAdmin === true ?

                <>
                    <td>
                        <button type="button" onClick={(e)=>updateQuantity(e,prod.id)} className="btn btn-success btn-sm">Update Quantity</button>
                    </td>
                    <td>
                        <button type="button" onClick={(e)=>deleteProduct(e,prod.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td></>
                    
                :

                <td>
                    <button type="button" onClick={()=>addToCart(prod.id)}>Thêm vào giỏ hàng</button>
                </td>
            }
        </tr>
    )

}
export default QuantityInput;