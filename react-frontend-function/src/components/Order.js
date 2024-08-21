import React, { useState } from "react";
import OrderService from "../services/OrderService";
import swal from "sweetalert";
import EmployeeService from "../services/EmployeeService";

function Order({order}){
    const [token, setToken] = useState(EmployeeService.getToken());
    const deleteOrder = async (e,id) => {
        const thisClicked = e.currentTarget;
        try {
            thisClicked.innerText = "Deleting"
            const response = OrderService.deleteOrderByIdOrder(id,token);
            swal("Successfully!" , response.message ? response.message : "Xoa" , "success");
            thisClicked.closest("tr").remove()
        } catch (error) {
            console.log(error);
            swal("Failed" , "Xoa That Bai" , "error");

        }
    }
    return(
        <tr key={order.orderId}>
            <td>{order.orderId}</td>
            <td>{order.productId}</td>
            <td>{order.productName}</td>
            <td>{order.quantity}</td>
            <td>{order.employeeId}</td>
            <td>{order.empName}</td>
            <td>{order.orderTime}</td>
            <td>{order.status === 1 ? "Đã Thanh Toán" : "Không xác định"}</td>
            <td>{order.totalAmount}</td>

            <td>
                <button type="button" onClick={(e) => deleteOrder(e.order.id)} className="btn btn-danger btn-sm"> Delete</button>
            </td>
        </tr>
    )
}

export default Order;