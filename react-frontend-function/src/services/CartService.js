import axios from "axios";

class CartService{
    static EMPLOYEE_API_BASE_URL = "http://localhost:8080/public/cart";
    

    static async addCart(data, token){
        try {
            const response = 
            await axios.post(`${CartService.EMPLOYEE_API_BASE_URL}/addcart`, data, 
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )

            return response.data;
        } catch (error) {
            throw error
        }
    }

    static async deleteCartByIdCart(id, token){
        try {
            const response = 
            await axios.delete(`${this.EMPLOYEE_API_BASE_URL}/delete-cart-by-id/${id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getAllCart(token){
        try {
            const response = await axios.get(`${CartService.EMPLOYEE_API_BASE_URL}/list-all-cart`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
        } catch (error) {
            
        }
    }
    static async getAllCartByUser(token){
        try {
            const response = await axios.get(`${CartService.EMPLOYEE_API_BASE_URL}/list-cart-by-user`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
        } catch (error) {
            
        }
    }
}

export default CartService;