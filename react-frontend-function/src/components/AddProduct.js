import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../services/ProductService"
import swal from "sweetalert";
function AddProduct(){
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [productInput,setProductInput] = useState({
        productId: '',
        description: '',
        productName: '',
        price: '',
        quantity: ''
    });

    const handleInput = (e) => {
        setProductInput({...productInput, [e.target.name]: e.target.value})
    }

    const save = async (e) => {
        const data = {
            description: productInput.description,
            productName: productInput.productName,
            price: productInput.price,
            quantity: productInput.quantity
        }
        
        const response = await ProductService.addProduct(data, token);
        if(response.message){
            swal("Successfully!", response.message, "error");
            navigate("/products")
        }
    }
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>New Product
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end">BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={save}>
                                    <div className="form-group mb-3">
                                        <label>Description</label>
                                        <input type="text" name="description" onChange={handleInput} value={productInput.description} className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Name</label>
                                        <input type="text" name="productName" onChange={handleInput} value={productInput.productName} className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Price</label>
                                        <input type="text" name="price" onChange={handleInput} value={productInput.price} className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Quantity</label>
                                        <input type="text" name="quantity" onChange={handleInput} value={productInput.quantity} className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Product</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;