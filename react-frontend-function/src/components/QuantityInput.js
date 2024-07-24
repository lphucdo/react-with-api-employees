import React,{useState} from "react";
import CartService from "../services/CartService";
import swal from "sweetalert";
import { Link } from "react-router-dom";
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
            console.log(payload);
            try {
                const response = await CartService.addCart(payload , token);
                swal("Successfully", response.message ? response.message : "Them thanh cong" , "success");
            } catch (error) {
                throw error;
            }
        }
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
                        <Link to={`/edit-product`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={()=>addToCart(prod.id)} className="btn btn-danger btn-sm">Delete</button>
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