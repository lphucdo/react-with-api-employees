import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ProductService from "../services/ProductService";
import QuantityInput from "./QuantityInput";
import EmployeeService from "../services/EmployeeService";

function ViewProduct (){
    const [loading,setLoading] = useState([true]);
    const [product,setProduct] = useState();
    const token = localStorage.getItem('token');
    const isAdmin = EmployeeService.isAdmin()

    useEffect(()=>{
        fetchProduct();
    },[])

    const fetchProduct = async () => {
        try {
            const response = await ProductService.getAllProduct(token);
            setProduct(response.listProduct);
            setLoading(false);
        } catch (error) {
            swal("Failed!" , "Failed fetching data", 'error')
        }
    }

    if(loading){
        return <h4>Loading Product Data</h4>
    }else{
        var prodcut_HTMLABLE = "";
        prodcut_HTMLABLE = product.map((prod, index) => {
            return (
                <QuantityInput prod={prod} index={index} isAdmin={isAdmin}/>
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
                                <h4>Product
                                    {isAdmin === true ? 
                                        <Link to={`/add-product`} className="btn btn-primary btn-sm float-end">Thêm sản phẩm</Link>
                                        :
                                        <Link to={`/my-cart`} className="btn btn-primary btn-sm float-end">Giỏ Hàng Của Tôi</Link>
                                    
                                    }
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prodcut_HTMLABLE}
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

export default ViewProduct;