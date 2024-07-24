
import React,{useState, useEffect} from "react";
import CartService from "../services/CartService"
import Cart from "./Cart";
import swal from "sweetalert";
function ViewCart(){
    const token = localStorage.getItem("token");
    const [cart,setCart] = useState();
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        fetchAllCart();
    }, [])
    
    const fetchAllCart = async () => {
        try {
            const response = await CartService.getAllCart(token)
            setCart(response.listCart)
            console.log(response.listCart);
            swal("Xin Chao", response.message ? response.message : "Hi" , "success")
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    if(loading){
        return <h4>ON LOADING</h4>
    }else{
        var HTML = "";
        HTML = cart.map((item,index)=>{
            return (
                <Cart cart={item} index={index}></Cart>
            )
        })
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>CART CRUD
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Product Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>By User</th>
                                            <th>Total Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {HTML}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ViewCart;