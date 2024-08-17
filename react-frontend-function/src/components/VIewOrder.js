
import React,{useState, useEffect} from "react";
import OrderService from "../services/OrderService"
import Order from "./Order";
import swal from "sweetalert";
function ViewOrder(){
    const token = localStorage.getItem("token");
    const [order,setOrder] = useState();
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        fetchAllOrder();
    },[])
    
    const fetchAllOrder = async () => {
        try {
            const response = await OrderService.getAllOrder(token)
            
            setOrder(response)
            console.log(response);
            swal("Xin Chao", response.message ? response.message : "Hi" , "success")
            setLoading(false)
        } catch (error) {
            setLoading(true)
            console.log(error);
        }
    }

    if(loading){
        return <h4>ON LOADING</h4>
    }else{
        var HTML = "";
        HTML = order.map((item)=>{
            return (
                <Order order={item}></Order>
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
                                <h4>
                                    Orders
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID Order</th>
                                            <th>ID Product</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>UserId</th>
                                            <th>Name Employee</th>
                                            <th>Order Time</th>
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

export default ViewOrder;