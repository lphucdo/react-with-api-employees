import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import OrderService from "../services/OrderService"
function MyCart(){
    const [cart,setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        fetchCartData();
    },[])

    const fetchCartData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await OrderService.getAllCartByUser(token);
            setCart(response.listCart);
            console.log(response);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    const handleCODPayment = async () => {
        window.confirm("Phong Cach");
    }
    if(loading){
        return <h4>Loading Cart...</h4>
    }else{
        var HTML = ""
        HTML = cart.map((item, index) => (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.product.productName}</td>
                <td>{item.product.description}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
            </tr>
        ))
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    My Cart
                                    <Link to={'/products'} className="btn btn-danger btn-sm float-end">BACK </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Cart ID</th>
                                            <th>Product Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {HTML}
                                    </tbody>
                                </table>
                                <button className="btn btn-primary btn-lg btn-block" onClick={handleCODPayment}>
                                    Pay with Cash
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyCart;