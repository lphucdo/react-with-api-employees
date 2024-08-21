import React, { useState, useEffect } from "react";
import OrderService from "../services/OrderService";
import Order from "./Order";
import swal from "sweetalert";
import EmployeeService from "../services/EmployeeService";

function ViewOrder() {
    const [token, setToken] = useState(EmployeeService.getToken());
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await OrderService.getAllOrder(token);
            setOrders(response);
        } catch (error) {
            swal("Error", "Unable to fetch orders", "error");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h4>Loading...</h4>;
    }

    const totalAmount = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Orders</h4>
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
                                        <th>Status</th>
                                        <th>Total Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <Order key={order.id} order={order} />
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={7}>Total:</td>
                                        <td colSpan={2}>{totalAmount}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewOrder;
